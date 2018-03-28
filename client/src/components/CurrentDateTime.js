import React from 'react';

class CurrentDateTime extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    dateTime: new Date()
  };
}

  componentDidMount() {
    this.intervalId = setInterval(
      () => {
        this.setState({dateTime: new Date()})
      },
      1000
    )
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  render() {
    return(
      <span className="CurrentDateTime">
        {this.state.dateTime.toLocaleDateString()}
        {this.state.dateTime.toLocaleTimeString()}
      </span>
    )
  }
}

export default CurrentDateTime;
