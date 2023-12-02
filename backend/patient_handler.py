# patient_handler.py

from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from marshmallow import ValidationError
from marshmallow import fields, validate
from models import PatientSchema
from werkzeug.security import check_password_hash
from bson.json_util import dumps


patient_handler = Blueprint('patient_handler', __name__)
patient_schema = PatientSchema()

mongo = None

def init_app(app, mongoDb):
    global mongo
    mongo = mongoDb
    app.register_blueprint(patient_handler)

@patient_handler.route('/api/patients', methods=['POST'])
def create_patient():
    try:
        # Validate and deserialize input
        patient = patient_schema.load(request.json)
        
        # Hash password
        patient['password'] = generate_password_hash(patient['password'])

        # Store the user
        mongo.db.patients.insert_one(patient)

        # Remove password before returning the response
        patient.pop('password', None)

        return jsonify(patient), 201

    except ValidationError as err:
        return jsonify(err.messages), 400

    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500


@patient_handler.route('/api/patients/login', methods=['POST'])
def login():
    try:
        # Get the email and password from the request
        email = request.json.get('email')
        password = request.json.get('password')

        # Find the patient in the database
        patient = mongo.db.patients.find_one({'_id': email})

        # If the patient was not found or the password is wrong, return an error
        if patient is None or not check_password_hash(patient['password'], password):
            return jsonify({'error': 'Invalid credentials'}), 401

        # If the login was successful, remove the password from the response
        patient.pop('password', None)

        # Return the patient data
        return jsonify(patient), 200

    except Exception as e:
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500

from bson import ObjectId


@patient_handler.route('/api/patients/<string:email>', methods=['GET'])
def get_patient(email):
    patient = mongo.db.patients.find_one({'_id': email})
    if patient:
        image_data = []
        for image_id in patient['images']:
            image = mongo.db.images.find_one({'id': image_id})
            if image:
                # Ensure the image object has a 'date' property here
                image['date'] = image.get('date')#s, "Default date if none found")
                image_data.append(image)
        patient['images'] = image_data
        return dumps(patient), 200  # use bson's dumps method
    else:
        return jsonify({'error': 'Patient not found'}), 404



