import create from 'zustand';

type NotificationVariant = 'success' | 'error';
interface NotificationState {
  isOpen: boolean;
  msg: string;
  variant: NotificationVariant;
  show: (msg: string, variant: NotificationVariant) => void;
  close: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  isOpen: false,
  msg: '',
  variant: 'success',
  show: (msg: string, variant) => set({ isOpen: true, msg, variant }),
  close: () => set({ isOpen: false }),
}));
