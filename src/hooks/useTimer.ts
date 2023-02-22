import { useEffect, useState } from "react";

const useTimer = (maxTime: number) => {
  const [timer, setTimer] = useState<number>(0);
  const isTimerRunning = timer > 0;

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  const startTimer = () => {
    setTimer(maxTime);
  };

  const resetTimer = () => {
    setTimer(0);
  };

  return { timer, isTimerRunning, startTimer, resetTimer };
};

export default useTimer;
