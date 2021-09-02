import React from "react";
const Progress = ({ title, completed = 0, total = 1 }) => {
  const circumference = 30 * 2 * Math.PI;
  const percent = (completed / total) * 100;
  return (
    <div className="flex flex-col content-center">
      <h2 className="text-black-200 text-center font-bold capitalize text-2xl">
        {title}
      </h2>
      <div className="inline-flex items-center justify-center overflow-hidden rounded-full ml-auto mr-auto">
        <svg className="w-20 h-20">
          <circle
            className="text-gray-300"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
          <circle
            className="text-blue-600"
            strokeWidth="5"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={`${
              circumference - (percent / 100) * circumference
            }`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
          />
        </svg>
        <span className="absolute text-xl text-blue-700">{`${percent}%`}</span>
      </div>
    </div>
  );
};

export default Progress;
