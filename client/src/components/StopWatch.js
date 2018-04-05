import React from 'react';

function StopWatch(props){
  const seconds = props.seconds;

  function formatSeconds(sec){
    let date = new Date(1970,0,1);
    date.setSeconds(sec);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  }

    return(
      <div className="StopWatch">
        {formatSeconds(seconds)}
      </div>
    )
}
export default StopWatch;
