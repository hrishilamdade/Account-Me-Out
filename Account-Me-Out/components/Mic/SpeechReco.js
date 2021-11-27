import React from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
// import Siriwave from 'react-siriwave';

const appId = '7485fb98-8557-4375-8387-ec394333c297';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const Mic = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous :  true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  async function onStop() {

        SpeechRecognition.stopListening();

        // console.log('transcript is: ',transcript);

        const url = "http://localhost:8000/vpaInput";

        const temp = transcript ;

        // resetTranscript();
        console.log('transcript is: ',transcript);
        
        await axios.post(url, {input :temp}, {headers : {
            'Content-Type' : 'application/json'
        }})
        .then((res)=>{
            console.log(res);
        })

        // resetTranscript();
    }

  return (
    <div>
      {/* <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      >Hold to talk</button> */}
      <button className="btn btn-primary" onClick={startListening} type="button">Start</button>
      <button className="btn btn-danger" onClick={onStop} type="button">Stop</button>

      {/* {() => {onStop}} */}
    </div>
  );
};
export default Mic;