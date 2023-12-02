from flask import Flask
from flask_pymongo import PyMongo
from image_processing import init_app as init_image_processing  # import init_app from image_processing
from patient_handler import init_app as init_patient_handler  # import init_app from patient_handler
from flask import Flask, jsonify

app = Flask(__name__)

# setup mongoDB connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/scentiDB"
mongo = PyMongo(app)

# Initialize patient_handler and image_processing with mongo instance
init_patient_handler(app, mongo)  # Call init_app with the Flask and PyMongo instances for patient_handler
init_image_processing(app, mongo)  # Call init_app with the Flask and PyMongo instances for image_processing

@app.route('/', methods=['GET'])
def home():
    return "Hello, this is the main page. Use the endpoint /api/upload for predictions."

@app.route('/test_db', methods=['GET'])
def test_db():
    try:
        # Try to insert a document
        mongo.db.test_collection.insert_one({"test": "data"})
        
        # Try to retrieve a document
        doc = mongo.db.test_collection.find_one({"test": "data"})
        
        # Convert ObjectId to string
        doc["_id"] = str(doc["_id"])
        
        # If both operations are successful, then the connection is working
        return jsonify({"message": "Successfully connected to the database", "doc": doc}), 200
    except Exception as e:
        # If there was an error, return the error message
        return jsonify({"message": "An error occurred: " + str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

# from flask import Flask, request, jsonify
# from werkzeug.utils import secure_filename
# import joblib
# import numpy as np
# import cv2
# from flask_pymongo import PyMongo
# import os
# from models import ImageSchema, PatientSchema


# # process_image is your function to process the image
# def process_image(image):
#     return cv2.resize(image, (224, 224))

# # load the model at the start
# model = joblib.load('model.pkl')

# app = Flask(__name__)

# # setup mongoDB connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/yourDatabaseName"
# mongo = PyMongo(app)

# @app.route('/', methods=['GET'])
# def home():
#     return "Hello, this is the main page. Use the endpoint /api/upload for predictions."

# @app.route('/api/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part in the request'}), 400

#     file = request.files['file']
#     filename = secure_filename(file.filename)

#     # save file to /uploads
#     filepath = os.path.join('/uploads', filename)
#     file.save(filepath)

#     # process image and predict
#     image = cv2.imread(filepath)
#     processed_image = process_image(image)
#     prediction = model.predict(np.array([processed_image]))

#     # create or update patient
#     patient_id = request.form.get('patient_id')
#     if patient_id:
#         patient = mongo.db.patients.find_one_or_404({"_id": ObjectId(patient_id)})
#     else:
#         patient_id = str(mongo.db.patients.insert_one({}).inserted_id)

#     # insert image analysis result into database
#     image_result = {
#         "patientId": patient_id,
#         "originalImage": filepath,
#         "processedImage": processed_image.tolist(), # assuming it's a numpy array
#         "imageAnalysis": { # replace with actual analysis
#             "brightness": 0,
#             "color": "blue",
#         },
#         "prediction": prediction.tolist() # assuming it's a numpy array
#     }
#     mongo.db.images.insert_one(image_result)

#     return jsonify({'prediction': prediction.tolist()})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001)
