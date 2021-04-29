import React, { Component } from 'react';
// import "./style.css";
import { interval, Subject } from "rxjs";
import { takeUntil,count  } from "rxjs/operators";

class App extends Component {
    state={
        count:'stop',
        time:0
    }


startTimer(){
    const unsubscribe$ = new Subject();
    const {count}=this.state
        interval(1000,1000)
        .pipe(takeUntil(unsubscribe$))
        .subscribe((val) => {
            console.log(val);
          if (count === "run") {
           this.setState({time:val});
          }
  }) 

// return () => {
//     unsubscribe$.next();
//     // unsubscribe$.complete();
//   };
}

start =()=>this.setState({count:'run'},this.startTimer)
stop =()=>this.setState({count:'stop', time:0})
reset =()=>this.setState({time:0})

    render() {
        const{time}=this.state
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