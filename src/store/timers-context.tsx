import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

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

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

type TimersAction = {
  type: 'ADD_TIMER' | 'START_TIMERS' | 'STOP_TIMERS';
};

function timersReducer(state: TimersState, action: TimersAction): TimersState {}

export const TimersContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(timersReducer, initialState);

  const value: TimersContextValue = {
    isRunning: true,
    timers: [],
    addTimer(timer: Timer) {
      dispatch({ type: 'ADD_TIMER' });
    },
    startTimers() {
      dispatch({ type: 'START_TIMERS' });
    },
    stopTimers() {
      dispatch({ type: 'STOP_TIMERS' });
    },
  };
  return (
    <TimersContext.Provider value={value}>{children}</TimersContext.Provider>
  );
};

export const useTimersContext = () => {
  const timersContext = useContext(TimersContext);
  if (timersContext === null) {
    throw new Error('TimersContext is null');
  }
  return timersContext;
};
