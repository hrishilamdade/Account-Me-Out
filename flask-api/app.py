from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import certifi
import webbrowser as wb
import speech_recognition as sr
from time import *
from gtts import gTTS
import os
import playsound 
import random

input_till_now = ""
x = 0

app = Flask(__name__)

CORS(app, support_credentials=True)

client = PyMongo(app, uri = "mongodb+srv://root:123@cluster0.zmfng.mongodb.net/account_me_out")
db = client.db

transactions = db['transactions']
loans = db['loans']
user_collection=db['user']
transactions_collection = db['transactions']
loan_collection = db['loans']
user_collection = db['user']
print(user_collection)
user_query1 = list(user_collection.find({"acc_num" :"12"}))[0]
print(user_query1)


def speak(text):
    tts=gTTS(text=text,lang='en')
    r=random.randint(1,10000000)
    filename="voice"+str(r)+".mp3"
    tts.save(filename)
    playsound.playsound(filename)
    os.remove(filename)


def respond(voice_data):
    if 'HELLO' in voice_data:
        speak('Hi, My name is huhu. How can I help you ?')

    elif 'ACCOUNT BALANCE' in voice_data:
        speak('Please wait, fetching your account details..')
        wb.open("http://localhost:3000/admin/loan")
        
    elif 'HISTORY' in voice_data:
        speak('Please wait, fetching your transaction history  details..')
        wb.open("http://localhost:3000/admin/dashboard")

    elif 'LOAN' in voice_data:
        speak('Be patient, redirecting you to loan page..')
        wb.open("http://localhost:3000/admin/loan")

    elif 'TRANSACTION' in voice_data or 'TRANSFER' in voice_data or 'SEND' in voice_data:
        speak('Okay wait, redirecting you to transaction page')
        wb.open("http://localhost:3000/admin/transfer")


    else:
        speak("Sorry, I didn't get that. Can you speak again!")

@app.route("/vpaInput", methods = ["POST"])
@cross_origin(origin="*",supports_credentials=True)
def vpaInput():

    global input_till_now
    global x

    res = request.get_json()

    text = res['input']

    if x==0 and text != "":
        input_till_now = text
        x+=1
    elif x >= 1:
        text = text[len(input_till_now)+1 : ]
        input_till_now += " " + text

    print(text)
    respond(text)


    return {"message" : "success"}

@app.route("/loanForm", methods = ["POST"])
@cross_origin(origin="*", supports_credentials=True)
def loanForm():

    data = request.form['loan_form']
    f = request.files['file'].read()  
    fi = request.files['file']
    fi.save(fi.filename)  

    print(data)
    print(type(data))

    data = data.split(",")

    l = []

    for d in data:

        temp = d.split(":")[1]
        l.append(temp[1:len(temp)-1])

    loan_collection.insert_one({
        'name' : l[0],
        'address' : l[1],
        'loanType' : l[2],
        'amount' : l[3],
        'file' : f
    })

    user_query = list(user_collection.find({"name" : l[0]}))[0]

    
    print(user_query['acc_bal'])

    user_query['acc_bal'] += int(l[3])

    print(user_query['acc_bal'])

    user_collection.update_one({'name' : l[0]}, {'$set' : {'acc_bal' : user_query['acc_bal']}})
    
    return {"message" : "success"}


@app.route("/transferForm", methods = ["POST"])
def transferForm():

    data = request.get_json()
    print(data)
    transactions.insert_one(data)
    user_query1 = list(user_collection.find({"acc_num" :data['accountOfReceiver']}))[0]
    user_query2 = list(user_collection.find({"acc_num" :data['sender']}))[0]
    user_query1['acc_bal']+=int(data['amountToTranfer'])
    user_query2['acc_bal']-=int(data['amountToTranfer'])
    print(user_query1)
    print(user_query2)
    user_collection.update_one({'acc_num' : data['accountOfReceiver']}, {'$set' : {'acc_bal' : user_query1['acc_bal']}})
    user_collection.update_one({'acc_num' : data['sender']}, {'$set' : {'acc_bal' : user_query2['acc_bal']}})
    return {"message" : "success"}

if __name__ == "__main__":
    app.run(port=8000, debug = True)