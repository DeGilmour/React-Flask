from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import os, certifi
from config import SECRET_KEY, MONGO_URI



app = Flask(__name__ 
    , static_folder='front',static_url_path='')

cors = CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))

DEBUG = True
UPLOAD_FOLDER = os.path.join(basedir, 'images')
app.config['DEBUG'] = True

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MONGO_URI'] = MONGO_URI
app.config['SECRET_KEY'] = SECRET_KEY
mongo = PyMongo(app, tlsCAFile=certifi.where())

db = mongo.db.products


from project.view import view

