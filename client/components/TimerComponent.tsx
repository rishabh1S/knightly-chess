import React from "react";
import { useTimer } from "react-timer-hook";

interface TimerComponentProps {
  expiryTimestamp: Date;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  return (
    <div className="text-4xl px-4 bg-slate-900">
      <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};

export default TimerComponent;
