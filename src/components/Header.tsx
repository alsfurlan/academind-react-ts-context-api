import { FC } from 'react';
import Button from './UI/Button';
import { useTimersContext } from '../store/timers-context';

export const Header: FC = () => {
  const { isRunning, startTimers, stopTimers } = useTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>
      <Button onClick={isRunning ? stopTimers : startTimers}>
        {isRunning ? 'Stop' : 'Start'} Timers
      </Button>
    </header>
  );
};
