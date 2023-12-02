from marshmallow import Schema, fields, validate

class ImageSchema(Schema):
    id = fields.Str(required=True)
    patientId = fields.Str(required=True)
    imageAnalysis = fields.List(fields.Float(), required=True)
    prediction = fields.Int(required=True)
    date = fields.Str(required=True)  # Change this line

    # originalImage = fields.Str(required=True)
    # processedImage = fields.List(fields.Float(), required=True)


class PatientSchema(Schema):
    _id = fields.Email(required=True)
    fullName = fields.Str(required=True)
    age = fields.Int(required=True)
    gender = fields.Str(validate=validate.OneOf(["male", "female", "Male", "Female"]))
    images = fields.List(fields.Str(), required=False)  # List of strings
    username = fields.Str(required=True)
    password = fields.Str(required=True)  # Important: Make sure to hash this before storing in your database!

# class PatientSchema(Schema):
#     _id = fields.Str(required=True)
#     fullName = fields.Str(required=True)
#     age = fields.Int(required=True)
#     gender = fields.Str(required=True, validate=validate.OneOf(["Male", "Female"]))
#     images = fields.List(fields.Str(), required=False)
#     username = fields.Str(required=True)
#     password = fields.Str(required=True)  # Important: Make sure to hash this before storing in your database!
