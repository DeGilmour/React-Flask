How to start this application.

Starting the backend: 

Inside the React-Flask folder, create a virtual enviroment.
Run it, and run the following command:

pip install -r requirements.txt

Go back to the React-Flask folder.
In the config.py file,

1. Add your MongoDB connection string to the const MONGO_URI
2. Add a secret key to the const SECRET_KEY
3. Save the file.

Now inside the React-Flask folder, using a bash terminal, run:

set flask_app=start.py
flask run

Starting the frontend: 

Inside the React-Flask folder, using a bash terminal.

cd client/client-view-type
npm start


