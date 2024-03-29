import { FC, useEffect, useRef, useState } from 'react';
import Container from './UI/Container';
import {
  useTimersContext,
  type Timer as TimerProps,
} from '../store/timers-context';

export const Timer: FC<TimerProps> = ({ name, duration }: TimerProps) => {
  const durationInMilliseconds = duration * 1000;
  const [remainingTime, setRemainingTime] = useState(durationInMilliseconds);
  const remainingTimeInSeconds = remainingTime / 1000;
  const interval = useRef<number | null>(null);
  const { isRunning } = useTimersContext();

  if (remainingTimeInSeconds <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) =>
          prevTime <= 0 ? prevTime : prevTime - 50
        );
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <Container as='article'>
      <h2>{name}</h2>
      <p>
        <progress max={durationInMilliseconds} value={remainingTime} />
      </p>
      <p>{remainingTimeInSeconds}</p>
    </Container>
  );
};
