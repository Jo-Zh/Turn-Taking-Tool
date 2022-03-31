import React from "react";
import "./timer.css";
import timeFormat from "./functions/timeFormat";

//-----------------parent component------------------//
const Timer = () => {
  const [sessionIntervalTime, setSessionIntervalTime] = React.useState(5 * 60);
  const [playOn, setPlayOn] = React.useState(false);

  const alert = React.useRef();
  const beepPlayer = () => {
    alert.current.play();
  };
  const beepReset = () => {
    alert.current.pause();
    alert.current.currentTime = 0;
  };
  //displaying timer and set interval time-----//

  const setIntervalTimeHandler = (value) => {
    if (sessionIntervalTime <= 60 && value < 0) {
      return;
    }
    if (sessionIntervalTime > 3540 && value > 0) {
      return;
    }
    setSessionIntervalTime((prev) => prev + value);
  };
  //--------------------run timer-------------------------//

  const sessionOn = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    if (!playOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setSessionIntervalTime((prev) => {
            if (prev <= 0) {
              beepPlayer();
              return sessionIntervalTime;
            }

            return prev - 1;
          });

          nextDate += second;
        }
      }, 30);
      localStorage.removeItem("interval-id");
      localStorage.setItem("interval-id", interval);
    }
    if (playOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setPlayOn(!playOn);
  };

  //-----------------reset Timer------------//
  const resetHandle = () => {
    beepReset();
    setSessionIntervalTime(5 * 60);
    setPlayOn(false);
    clearInterval(localStorage.getItem("interval-id"));
  };

  return (
    <>
      <div className="control-panel">
        <label id="session-label">Waiting Timer</label>
        <SessionInterval
          IntervalTimeHandler={setIntervalTimeHandler}
          intervalTime={sessionIntervalTime}
        />
        <div className="button">
          <button id="start_stop" type="button" onClick={sessionOn}>
            {playOn ? "Pause" : "Play"}
          </button>
          <button id="reset" type="button" onClick={resetHandle}>
            reset/stop
          </button>
        </div>
      </div>

      <audio
        id="beep"
        type="audio"
        ref={alert}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </>
  );
};
//--------------child component---------//
const SessionInterval = (props) => {
  const IntervaladdHandler = () => {
    props.IntervalTimeHandler(60);
  };
  const IntervalsubHandler = () => {
    props.IntervalTimeHandler(-60);
  };
  return (
    <div className="set-panel">
      <button type="button" onClick={IntervaladdHandler}>
        +
      </button>
      <div className="intervaltime-display">
        {timeFormat(props.intervalTime)}
      </div>
      <button type="button" onClick={IntervalsubHandler}>
        -
      </button>
    </div>
  );
};

export default Timer;
