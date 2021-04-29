import React, { Component } from "react";
// import "./style.css";
import { interval, timer, Subject, NEVER } from "rxjs";
import { takeUntil, switchMap, tap, pipe } from "rxjs/operators";

class App extends Component {
  state = {
    count: true,
    time: 0,
  };

  startTimer() {
    
switchMap((state) =>
      state.count
        ? interval(1000, 1000).pipe(
            tap((val) => {
              this.setState({ time: val });
            })
          )
        : NEVER
    ).subscribe()
   
    // return () => {
    //     unsubscribe$.next();
    //     // unsubscribe$.complete();
    //   };
  }

  start = () => this.setState({ count: "run" }, this.startTimer);
  stop = () => this.setState({ count: "stop", time: 0 });
  reset = () => this.setState({ time: 0 });

  render() {
    const { time } = this.state;
    // const source = interval(1000);
    //output: 0,1,2,3,4,5....
    // const subscribe = source.subscribe(val => console.log(val));
    return (
      <>
        <div>
          <span> {new Date(time).toISOString().slice(11, 19)}</span>
          <button className="start-button" onClick={this.start}>
            Start
          </button>
          <button className="stop-button" onClick={this.stop}>
            Stop
          </button>
          <button onClick={this.reset}>Reset</button>
          {/* <button onClick={wait}>Wait</button> */}
        </div>
      </>
    );
  }
}

export default App;
