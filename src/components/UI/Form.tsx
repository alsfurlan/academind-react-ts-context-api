import {
  ComponentPropsWithoutRef,
  FormEvent,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

export type FormHandle = {
  clear: () => void;
}

type FormProps = ComponentPropsWithoutRef<'form'> & {
  onSave: (value: unknown) => void;
};

export const Form = forwardRef<FormHandle, FormProps>(
  ({ children, onSave, ...otherProps }, ref) => {
    const form = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => {
      return {
        clear() {
          form.current?.reset();
        },
      };
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);
      onSave(data);
      // form.current?.reset();
    }

    return (
      <form
        {...otherProps}
        onSubmit={(event) => handleSubmit(event)}
        ref={form}
      >
        {children}
      </form>
    );
  }
);

