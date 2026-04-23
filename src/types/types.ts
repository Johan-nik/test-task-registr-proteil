export interface FormData {
  username: string;
  phonenumber: string;
  company: string;
  supervisor: string;
  email: string;
  textarea: string;
}

export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FormData | null;
}

export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}