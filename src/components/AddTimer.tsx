import { useRef } from 'react';
import Button from './UI/Button';
import { Form, FormHandle } from './UI/Form';
import Input from './UI/Input';
import { Timer, useTimersContext } from '../store/timers-context';

export const AddTimer = () => {
  const form = useRef<FormHandle>(null);
  const timersContext = useTimersContext();

  function handleSaveTimer(event: unknown): void {
    const data = event as Timer;
    if (
      !data ||
      typeof data !== 'object' ||
      !('name' in data) ||
      !('duration' in data)
    ) {
      return;
    }
    timersContext.addTimer(data);
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={(event) => handleSaveTimer(event)} id='add-timer'>
      <Input type='text' label='name' id='name' />
      <Input type='text' label='duration' id='duration' />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
};
