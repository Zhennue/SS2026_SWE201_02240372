import React, { useEffect, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <span className="clock">{time.toLocaleTimeString()}</span>;
}

export default LiveClock;
