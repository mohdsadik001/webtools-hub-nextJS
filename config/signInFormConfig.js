import { Mail, Lock } from 'lucide-react';

export const signInFormFields = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email address',
    icon: Mail,
    required: true,
    autoComplete: 'email'
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    icon: Lock,
    required: true,
    autoComplete: 'current-password'
  }
];
