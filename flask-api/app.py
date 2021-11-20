from flask import Flask, request
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)

client = PyMongo(app, uri = "mongodb+srv://root:123@cluster0.zmfng.mongodb.net/account_me_out?authSource=admin&replicaSet=atlas-80odye-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
db = client.db

transactions = db['transactions']

print(list(transactions.find({})))

CORS(app)

@app.route("/hi", methods = ["POST"])
def hi():
    transactions.insert_one({'example' : "Pranav"})
    return {"message" : "success"}

if __name__ == "__main__":
    app.run()