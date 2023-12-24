import React from "react";

interface EvaluationBarProps {
  evaluation: number;
}

const EvaluationBar: React.FC<EvaluationBarProps> = ({ evaluation }) => {
  const absEvaluation = Math.abs(evaluation);
  const halfHeight = 50;
  const gradientPosition =
    evaluation >= 0 ? `0% ${50 - absEvaluation}%` : `0% ${50 + absEvaluation}%`;

  return (
    <div className="flex items-center justify-center h-full ml-4">
      <div
        className="w-4"
        style={{
          height: "100%",
          background: `linear-gradient(to bottom, #fff ${halfHeight}%, #000 ${halfHeight}%)`,
          backgroundPosition: gradientPosition,
        }}
      />
    </div>
  );
};

export default EvaluationBar;
