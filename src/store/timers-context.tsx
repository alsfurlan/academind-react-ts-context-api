import { FC, PropsWithChildren, createContext } from 'react';

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimersContextValue = TimersState & {
  addTimer: (timer: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export const TimersContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value: TimersContextValue = {
    isRunning: false,
    timers: [],
    addTimer(timer: Timer) {},
    startTimers() {},
    stopTimers() {},
  };
  return (
    <TimersContext.Provider value={value}>{children}</TimersContext.Provider>
  );
};
