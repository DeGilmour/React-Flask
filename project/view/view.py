from email.mime import image
from urllib import request
from project import app, db
from flask import request, send_file
import json, os
from bson.objectid import ObjectId


# I decided for the sake of brevity to fuse the view with the api, just enough to establish the CRUD.

@app.route('/add-product', methods=['GET', 'POST'])
def create_product():
    "Creates the product"
    new_product = db.insert_one(request.json)
    new_id = new_product.inserted_id
    new_product = db.find_one({'_id': ObjectId(new_id)})
    return json.dumps({'data': 
        {'product_name': new_product['product_name'], 
         'product_value': new_product['product_value'], 
         'description': new_product['description'],
         'id': str(new_product['_id']), 'image_name': new_product['image_name']}})

@app.route('/upload-file', methods=['GET', 'POST'])
def upload_file():
    "Uploads the file to images folder"
    file = request.files.get('image', None)
    if file and file.filename:
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    return json.dumps({'success': 1}), 200, {'ContentType': 'application/json'}

@app.route('/', methods=['GET'])
def get_all_products():
    """Returns all the saved products"""
    documents = db.find()
    response = []
    for document in documents:
        dict_documentos = {}
        dict_documentos['id'] = str(document['_id'])
        dict_documentos['product_name'] = document['product_name']
        dict_documentos['product_value'] = document['product_value']
        dict_documentos['description'] = document['description']
        dict_documentos['image_name'] = document['image_name']
        response.append(dict_documentos)

    return json.dumps(response)

@app.route('/delete-product/<id>', methods=['POST', 'DELETE'])
def delete_product(id:int):
    """Deletes a single product based on the pk"""
    db.delete_one({'_id': ObjectId(id)})
    return json.dumps({'success': 1}), 200, {'ContentType': 'application/json'}
    

@app.route('/get-product/<id>', methods=['GET'])
def get_product(id:int) -> json:
    """Returns a product, into json like data, similar to Mongo"""
    product = db.find_one({'_id': ObjectId(id)})
    return json.dumps({'data': 
        {'product_name': product['product_name'], 
         'product_value': product['product_value'], 
         'description': product['description'],
         'id': str(product['_id']), 'image_name': product['image_name']}})

@app.route('/update-product/<id>', methods=['PUT'])
def update_product(id:int):
    """Updates the product"""
    filter = {'_id': ObjectId(id)}
    new_values = {"$set": {
        'product_name': request.json.get('product_name'),
        'product_value': request.json.get('product_value'),
        'description': request.json.get('description')}}
    db.update_one(filter, new_values)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}

@app.route('/get-image/<image_name>', methods=['POST','GET'])
def return_image(image_name:str):
    """Returns the content of the image to be viewed"""
    location = os.path.join(app.config['UPLOAD_FOLDER'])
    return send_file(location +  '/' + image_name)


