import React, {Component} from 'react';

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      seconds: 0
    }
    this.timerKey = null;
  }

  startTimer(){
      this.timerKey = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 1
      })
    }, 1000);
  }

  stopTimer(){
    clearInterval(this.timerKey);
    const timeData = this.state.seconds;
    const {passingTimeData =()=> {} } = this.props;
    passingTimeData(timeData);
  }

  formatSeconds(sec){
    let date = new Date(1970,0,1);
    date.setSeconds(sec);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  }

  componentDidMount(){
    console.log('timer A:', this.props.timer);
    if(this.props.timer == true) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  render(){
    const seconds = this.state.seconds;

    return(
      <div className="Timer">
        {this.formatSeconds(seconds)}
      </div>
    )
  }
}

export default Timer;
