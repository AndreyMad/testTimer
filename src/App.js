import React, { Component, useCallback } from "react";
import { render } from "react-dom";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil, take, tap } from "rxjs/operators";
import style from "./App.module.css";

export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");
  const [waitTimeStamp, setWaitTimeStamp] = useState(0);

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "start") {
          setSec((val) => val + 1000);
        }
      });

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

  const start = useCallback(() => {
    setStatus("start");
  }, []);

  const stop = useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);

  const reset = useCallback(() => {
    setSec(0);
  }, []);

  const wait = useCallback(() => {
    const timeStamp = new Date().getTime();
    if (timeStamp - waitTimeStamp < 300) {
      setStatus("wait");
      return;
    }
    setWaitTimeStamp(timeStamp);
  }, [waitTimeStamp]);

  return (
    <div className={style.container}>
      <span className={style.time}>
        {new Date(sec).toISOString().slice(11, 19)}
      </span>
      <button className="startBtn" onClick={start}>
        {status === "wait" ? "Resume" : "Start"}
      </button>
      <button
        disabled={status === "stop" || false}
        className="stopBtn"
        onClick={stop}
      >
        Stop
      </button>
      <button onClick={reset}>Reset</button>
      <button onClick={wait}>Wait</button>
    </div>
  );
}

render(<App />, document.getElementById("root"));
