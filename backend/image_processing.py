from werkzeug.utils import secure_filename
from flask import Blueprint, jsonify, request
from PIL import Image
import cv2
import numpy as np
import io
from uuid import uuid4
import base64
from bson.objectid import ObjectId
from tensorflow.keras.models import load_model
from models import ImageSchema
from datetime import datetime



mongo = None

def init_app(app, mongoDb):
    global mongo
    mongo = mongoDb
    app.register_blueprint(image_processing)



image_processing = Blueprint('image_processing', __name__)
model = load_model('model.h5')

def process_image(image):
    # Filter out pixels where all RGB values are less than 10
    lower_threshold = np.array([0, 0, 0], dtype=np.uint8)
    upper_threshold = np.array([255, 255, 255], dtype=np.uint8)
    mask = cv2.inRange(image, lower_threshold, upper_threshold)

    # Remove pixels where the RGB values don't differ more than 15 from each other
    diff_threshold = 15
    pixel_diff = np.max(image, axis=2) - np.min(image, axis=2)

    # Apply the filter to the image
    filtered_image = image.copy()
    filtered_image[(mask == 0) | (pixel_diff <= diff_threshold)] = [0, 0, 0]

    # Convert the filtered image to grayscale
    gray = cv2.cvtColor(filtered_image, cv2.COLOR_BGR2GRAY)

    # Perform morphological operations to enhance the rectangles
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    dilated = cv2.dilate(gray, kernel, iterations=3)
    eroded = cv2.erode(dilated, kernel, iterations=3)

    # Find contours in the eroded image
    contours, _ = cv2.findContours(eroded, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Keep track of the bounding rectangles
    bounding_rects = []

    # Iterate over the contours
    buffer = 10
    for i, contour in enumerate(contours):
        # Calculate the area of the contour
        contour_area = cv2.contourArea(contour)

        # Check if the contour area exceeds the threshold (1000 pixels)
        if contour_area > 1000:
            # Find the convex hull of the contour
            hull = cv2.convexHull(contour)

            # Find the bounding rectangle of the hull
            rect = cv2.boundingRect(hull)

            # Shrink the current rectangle by a buffer (e.g., 10 pixels)
            shrunken_rect = (
                rect[0] + buffer,
                rect[1] + buffer,
                rect[2] - 2 * buffer,
                rect[3] - 2 * buffer,
            )

            # Append the shrunken rectangle to the list of bounding rectangles
            bounding_rects.append(shrunken_rect)

    # Convert the filtered image back to PIL Image format
    filtered_image_pil = Image.fromarray(cv2.cvtColor(filtered_image, cv2.COLOR_BGR2RGB))

    # Resize the filtered image to match the input size of the model
    resized_image = cv2.resize(np.array(filtered_image_pil), (100, 100))

    return resized_image







def softmax(logits):
    e = np.exp(logits)
    return e / np.sum(e)

def image_analysis(image_np):
    num_bins = 32  # Reduce the color resolution

    # Compute the color histogram
    hist, _ = np.histogramdd(image_np.reshape(-1, 3), bins=(num_bins, num_bins, num_bins))

    # Compute the mean RGB value
    mean_rgb = np.mean(image_np, axis=(0, 1))

    # Compute image brightness and contrast
    image_gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
    brightness = np.mean(image_gray)
    contrast = np.std(image_gray)

    # Combine all features into a single vector
    features = np.concatenate([hist.flatten(), mean_rgb, [brightness, contrast]])

    return features



@image_processing.route('/scentipd/image_processing', methods=['POST'])
def process_upload():
    if 'image' not in request.json:
        return jsonify({'error': 'No image in the request'}), 400
    
    patientId = request.json.get('patientId', None)
    if not patientId:
        return jsonify({'error': 'No patientId in the request'}), 400

    # Generate a unique image ID
    imageId = str(uuid4())

    # Get current date and time
    now = datetime.now()

    try:
        base64_image = request.json['image']
        image_data = base64.b64decode(base64_image)

        # Convert image bytes to a PIL image object
        image = Image.open(io.BytesIO(image_data))

        # Convert the image to numpy array and process it
        np_image = np.array(image)
        processed_image = process_image(np_image)
        print('Processed image shape:', processed_image.shape)

        # Perform image analysis
        analysis_result = image_analysis(processed_image)
        print('Analysis result:', analysis_result)

        # Ensure the image data is in the right shape
        reshaped_image = processed_image.reshape(1, 100, 100, 3)
        print('Reshaped image shape:', reshaped_image.shape)

        # Use your model to predict
        prediction = model.predict(reshaped_image)
        print('Prediction:', prediction)

        probabilities = softmax(prediction)
        print('Probabilities:', probabilities)

        prediction = int(np.argmax(probabilities[0].tolist()))
        print('Prediction:', prediction)

        # Create an ImageSchema object
        image_schema = ImageSchema()

        if 'patientId' in request.json:
            print("Patient ID from request:", request.json['patientId'])
        else:
            print("patientId not in request")

        now = datetime.now()
        date_iso = now.strftime("%Y-%m-%d %H:%M:%S")  # Change this line


        # Fill the ImageSchema with the necessary data
        result = image_schema.load({
            'id': imageId,  # include the image id
            'patientId': request.json['patientId'],
            'imageAnalysis': analysis_result.tolist(),
            'prediction': prediction,  # Get the list of probabilities
            'date': date_iso

            # 'date': now.isoformat()  # add the current date and time
        })

        mongo.db.images.insert_one(result)
        print(result['date']) #2023-07-22 14:28:46


        result = mongo.db.patients.update_one({'_id': request.json['patientId']}, {'$push': {'images': imageId}})
        print(result.modified_count)  # Should be 1 if the document was updated

        # Send back the result
        return jsonify({
            'prediction': int(np.argmax(probabilities[0])),
            'date': date_iso

            # 'date': now.isoformat()  # add the current date and time to the response
        })

    except Exception as e:
        print(str(e))  # add this line
        return jsonify({'error': 'An error occurred processing the image. Error details: ' + str(e)}), 400














# @image_processing.route('/scentipd/image_processing', methods=['POST'])
# def process_upload():
#     if 'image' not in request.json:
#         return jsonify({'error': 'No image in the request'}), 400
    
#     patientId = request.json.get('patientId', None)
#     if not patientId:
#         return jsonify({'error': 'No patientId in the request'}), 400

#     # Generate a unique image ID
#     imageId = str(uuid4())

#     try:
#         base64_image = request.json['image']
#         image_data = base64.b64decode(base64_image)

#         # Convert image bytes to a PIL image object
#         image = Image.open(io.BytesIO(image_data))

#         # Convert the image to numpy array and process it
#         np_image = np.array(image)
#         processed_image = process_image(np_image)
#         print('Processed image shape:', processed_image.shape)

#         # Perform image analysis
#         analysis_result = image_analysis(processed_image)
#         print('Analysis result:', analysis_result)

#         # Ensure the image data is in the right shape
#         reshaped_image = processed_image.reshape(1, 100, 100, 3)
#         print('Reshaped image shape:', reshaped_image.shape)

#         # Use your model to predict
#         prediction = model.predict(reshaped_image)
#         print('Prediction:', prediction)

#         probabilities = softmax(prediction)
#         print('Probabilities:', probabilities)

#         prediction = int(np.argmax(probabilities[0].tolist()))
#         print('Prediction:', prediction)

#         # Create an ImageSchema object
#         image_schema = ImageSchema()

#         if 'patientId' in request.json:
#             print("Patient ID from request:", request.json['patientId'])
#         else:
#             print("patientId not in request")

#         # Fill the ImageSchema with the necessary data
#         result = image_schema.load({
#             'id': imageId,  # include the image id
#             'patientId': request.json['patientId'],
#             'imageAnalysis': analysis_result.tolist(),
#             'prediction': prediction  # Get the list of probabilities
#         })

#         # Save the `result` to a database
#         # mongo.db.images.insert_one(result)  # assuming your images collection is named "images"
        
#         # Update patient's images field with image id
#         # mongo.db.patients.update_one({'email': request.json['patientId']}, {'$push': {'images': imageId}})
#         mongo.db.images.insert_one(result)

#         result = mongo.db.patients.update_one({'_id': request.json['patientId']}, {'$push': {'images': imageId}})
#         print(result.modified_count)  # Should be 1 if the document was updated

#         # Send back the result
#         return jsonify({'prediction': int(np.argmax(probabilities[0]))})

#     except Exception as e:
#         print(str(e))  # add this line
#         return jsonify({'error': 'An error occurred processing the image. Error details: ' + str(e)}), 400
