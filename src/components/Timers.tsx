import { FC } from 'react';
import { useTimersContext } from '../store/timers-context';
import { Timer } from './Timer';

export const Timers: FC = () => {
  const { timers } = useTimersContext();

  return (
    <ul>
      {timers.map((timer) => (
        <Timer {...timer} />
      ))}
    </ul>
  );
};
