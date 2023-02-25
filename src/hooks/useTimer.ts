import { useCallback, useEffect, useState } from "react";

type Timer = {
  maxTime: number;
  startCondition?: boolean;
  resetCondition?: boolean;
};

const useTimer = ({ maxTime, startCondition, resetCondition }: Timer) => {
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

  const startTimer = useCallback(() => {
    setTimer(maxTime);
  }, [maxTime]);

  const resetTimer = useCallback(() => {
    setTimer(0);
  }, []);

  useEffect(() => {
    if (startCondition) {
      startTimer();
    }
  }, [startCondition, startTimer]);

  useEffect(() => {
    if (resetCondition) {
      resetTimer();
    }
  }, [resetCondition, resetTimer]);

  return { timer, isTimerRunning, startTimer, resetTimer };
};

export default useTimer;
