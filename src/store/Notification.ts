import create from 'zustand';

interface NotificationState {
  isOpen: boolean;
  msg: string;
  show: (msg: string) => void;
  close: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  isOpen: false,
  msg: '',
  show: (msg: string) => set({ isOpen: true, msg }),
  close: () => set({ isOpen: false }),
}));
