import { ReactMic } from 'react-mic';
import React, { useState } from 'react';
 
function Mic() {

    const [record, setrecord] = useState(false);

    const startRecording = () => {
        setrecord(true);
    }
    
    const stopRecording = () => {
        setrecord(false);
    }
    
    function onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }
    
    function onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
    }


    return (
        <div>
            <ReactMic
                record={record}
                className="sound-wave"
                onStop={onStop}
                onData={onData}
                strokeColor="#000000"
                backgroundColor="#FF4081" 
            />
            <button onClick={startRecording} type="button">Start</button>
            <button onClick={stopRecording} type="button">Stop</button>
        </div>
    )
}

export default Mic;

