"use client";
import React, { useEffect, useState } from "react";

interface EvalBarProps {
  pe: number;
}

const EvalBar: React.FC<EvalBarProps> = ({ pe }) => {
  const [wHeight, setWHeight] = useState(50);

  useEffect(() => {
    const evaluateFunc = (x: number) => {
      if (x === 0) {
        return 0;
      } else if (x < 7) {
        return -(0.322495 * Math.pow(x, 2)) + 7.26599 * x + 4.11834;
      } else {
        return (8 * x) / 145 + 5881 / 145;
      }
    };
    const evaluated = evaluateFunc(pe);
    setWHeight(50 + evaluated);
  }, [pe]);

  return (
    <div className="w-4 sm:w-8 h-full sm:mr-1 sm:mx-2">
      <div
        style={{
          height: `${100 - wHeight}%`,
        }}
        className="w-full bg-black transition ease-in-out duration-700 text-center"
      >
        <span className="text-sm font-bold text-white">
          {pe < 0 ? pe.toFixed(1) : ""}
        </span>
      </div>
      <div
        style={{
          height: `${wHeight}%`,
        }}
        className="w-full bg-gray-50 transition ease-in-out duration-700 text-center"
      >
        <div style={{ flex: "1" }} />
        <span className="text-sm font-bold text-black">
          {pe >= 0 ? `+${pe.toFixed(1)}` : pe.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default EvalBar;
