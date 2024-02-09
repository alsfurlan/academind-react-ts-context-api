import { FC } from 'react';
import Button from './UI/Button';
import { useTimersContext } from '../store/timers-context';

export const Header: FC = () => {
  const { isRunning } = useTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>
      <Button>{isRunning ? 'Stop' : 'Start'} Timers</Button>
    </header>
  );
};
