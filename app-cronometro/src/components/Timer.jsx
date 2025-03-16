import { useState } from 'react';
import './timer.css';

function TimeMarker() {

    let interval, initialTime, currentTime;
    let hourCounter, minutesCounter, secondsCounter;
    
    const updateTimer = () => {
        currentTime = Date.now();
        let hours = Math.floor(((currentTime - initialTime) / 3600000) - (60 * hourCounter));
        let minutes = Math.floor(((currentTime - initialTime) / 60000) - (60 * minutesCounter));
        let seconds = Math.floor(((currentTime - initialTime) / 1000) - (60 * secondsCounter));


        if (hours === 60) {
            stop();
        } 
        if (minutes === 60) {
            minutes = 0;
            minutesCounter ++;
        } 
        if (seconds === 60) {
            seconds = 0;
            secondsCounter ++;
        } 

        setHours(hours >= 10 ? hours.toString() : `0${hours}`);
        setMinutes(minutes >= 10 ? minutes.toString() : `0${minutes}`);
        setSeconds(seconds >= 10 ? seconds.toString() : `0${seconds}`);
    }

    const start = () => {
        hourCounter = 0;
        minutesCounter = 0;
        secondsCounter = 0;

        initialTime = Date.now();
        interval = setInterval(updateTimer, 1000);

        setButtonText('stop');
        setButtonEvent(() => stop);
    }

    const stop = () => {
        clearInterval(interval);
        
        setButtonText('start');
        setButtonEvent(() => start)
    }

    const [buttonText, setButtonText] = useState('start');
    const [buttonEvent, setButtonEvent] = useState(() => start);

    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');


    return (
        <div className="timer">
            <p className='timeMark'>{`${hours} : ${minutes} : ${seconds}`}</p>
            <button className='btnTimer' onClick={buttonEvent}>{buttonText}</button>
        </div>
    );
}

export default TimeMarker;