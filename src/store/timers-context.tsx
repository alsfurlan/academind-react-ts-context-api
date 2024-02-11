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

type StartTimersAction = {
  type: 'START_TIMERS';
};

type StopTimersAction = {
  type: 'STOP_TIMERS';
};

type AddTimerAction = {
  type: 'ADD_TIMER';
  payload: Timer;
};

type TimersAction = StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state: TimersState, action: TimersAction): TimersState {
  if (action.type === 'START_TIMERS') {
    return {
      ...state,
      isRunning: true,
    };
  }

  if (action.type === 'STOP_TIMERS') {
    return {
      ...state,
      isRunning: false,
    };
  }

  if (action.type === 'ADD_TIMER') {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          ...action.payload,
        },
      ],
    };
  }

  return state;
}

export const TimersContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(timersReducer, initialState);

  const value: TimersContextValue = {
    ...state,
    addTimer(timer: Timer) {
      dispatch({ type: 'ADD_TIMER', payload: timer });
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
