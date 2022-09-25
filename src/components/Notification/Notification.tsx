import { CloseIcon } from '../../icons';
import { useNotificationStore } from '../../store/Notification';

const VARIANTS = {
  success: 'bg-success',
  error: 'bg-error',
};

export const Notification = (): JSX.Element => {
  const [isOpen, msg, close, variant] = useNotificationStore((state) => [
    state.isOpen,
    state.msg,
    state.close,
    state.variant,
  ]);

  return (
    <div
      className={`${isOpen ? 'translate-x-0' : 'translate-x-80'} ${
        VARIANTS[variant]
      } fixed top-4 right-4 flex w-60 items-center rounded p-4 transition-transform`}
    >
      <div className="text-md">{msg}</div>
      <button className="btn btn-ghost btn-circle" onClick={close}>
        <CloseIcon />
      </button>
    </div>
  );
};
