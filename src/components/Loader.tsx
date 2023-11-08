import React, { useEffect, useState } from 'react';

type Props = {
  title: string;
};

export default function Loader({ title }: Props) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const maxTime = 60000; // 60 seconds
    let timeElapsed = 0;
    let timeout;

    const fakeLoad = () => {
      const remainingTime = maxTime - timeElapsed;
      const nextUpdateIn = Math.random() * (remainingTime / 20);

      timeout = setTimeout(() => {
        setPercentage((oldPercentage) => {
          const newPercentage = oldPercentage + 1;
          return newPercentage > 98 ? 98 : newPercentage;
        });

        timeElapsed += nextUpdateIn;
        if (timeElapsed < maxTime) {
          fakeLoad();
        }
      }, nextUpdateIn);
    };

    fakeLoad();

    return () => clearTimeout(timeout);
  }, []);

  const shimmerEffect = 'animate-pulse bg-gray-300';

  return (
    <div className="flex justify-center items-center">
      <div className="w-full">
        <div className="text-center mb-4">
          <h1 className="text-lg font-semibold">Generating {title}...</h1>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-center mt-2">
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
        {/* Each column representing the text */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Column */}
          <div className="flex-1 space-y-4 py-1">
            <div className={`${shimmerEffect} h-8 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-8 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-8 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-8 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-4 py-1">
            <div className={`${shimmerEffect} h-8 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-8 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-8 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-8 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
            <div className={`${shimmerEffect} h-6 rounded`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
