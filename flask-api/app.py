from flask import Flask, request
from flask_cors import CORS
from flask_pymongo import PyMongo

import webbrowser as wb
import speech_recognition as sr
from time import ctime
from gtts import gTTS
import os
import playsound 
import random

input_till_now = ""
x = 0

app = Flask(__name__)

client = PyMongo(app, uri = "mongodb+srv://root:123@cluster0.zmfng.mongodb.net/account_me_out?authSource=admin&replicaSet=atlas-80odye-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
db = client.db

transactions = db['transactions']

# print(list(transactions.find({})))

CORS(app)

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
        wb.open("http://localhost:3000/admin/dashboard")


    else:
        speak("Sorry, I didn't get that. Can you speak again!")

@app.route("/vpaInput", methods = ["POST"])
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
def loanForm():

    data = request.form['loan_form']
    f = request.files['file']  
    f.save(f.filename)  
    
    return {"message" : "success"}

if __name__ == "__main__":
    app.run(port=8000, debug = True)