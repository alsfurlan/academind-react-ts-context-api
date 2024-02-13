import { FC, useState } from 'react';
import Container from './UI/Container';
import { type Timer as TimerProps } from '../store/timers-context';

export const Timer: FC<TimerProps> = ({ name, duration }: TimerProps) => {
  const durationInMilliseconds = duration * 1000;

  const [remainingTime, setRemainingTime] = useState(durationInMilliseconds);

  setInterval(() => {
    setRemainingTime(prevTime => prevTime - 50);
  }, 50)
  
  return (
    <Container as='article'>
      <h2>{name}</h2>
      <p>
        <progress max={durationInMilliseconds} value={remainingTime}/>
      </p>
      <p>{duration}</p>
    </Container>
  );
};
