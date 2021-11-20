from flask import Flask, request
from flask_cors import CORS
from flask_pymongo import PyMongo
import webbrowser as wb
import speech_recognition as sr
from time import ctime
import webbrowser as wb
import time
import pyttsx3
from gtts import gTTS
import os
import time
import playsound 
import random
import pyaudio

app = Flask(__name__)

client = PyMongo(app, uri = "mongodb+srv://root:123@cluster0.zmfng.mongodb.net/account_me_out?authSource=admin&replicaSet=atlas-80odye-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
db = client.db

transactions = db['transactions']

# print(list(transactions.find({})))

CORS(app)

r = sr.Recognizer()

def record_audio(audio):
    
    # with sr.Microphone() as source:

        # r.adjust_for_ambient_noise(source)
        # r.energy_threshold = 1932
        # r.dynamic_energy_threshold = True
        # r.pause_threshold=1.2

    print("Say something!")
    # audio = r.listen(source)
    voice_data=''
        # try:

    voice_data=r.recognize_google(audio,language='eng-in')
        
        # except sr.UnknownValueError:
        #     speak("sorry i didn't get that")
        # except sr.RequestError:
        #     speak("sorry my services are currently down")
        # return voice_data

def speak(text):
    tts=gTTS(text=text,lang='en')
    r=random.randint(1,10000000)
    filename="voice"+str(r)+".mp3"
    tts.save(filename)
    playsound.playsound(filename)
    # speak(text)
    os.remove(filename)

@app.route("/vpaInput", methods = ["POST"])
def vpaInput():
    # transactions.insert_one({'example' : "Pranav"})
    # return {"message" : "success"}
    # print("GGG")
    res = request.get_json()

    blobUrl = res['input']['blobURL']
    wb.open("https://www.google.com/", new = 2)

    print(res)

    return {"message" : "success"}

if __name__ == "__main__":
    app.run(port=8000)