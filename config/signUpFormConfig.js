import { User, Mail, Lock, Shield } from 'lucide-react';

export const signUpFormFields = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    icon: User,
    required: true,
    autoComplete: 'name'
  },
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
    placeholder: 'Create a strong password',
    icon: Lock,
    required: true,
    autoComplete: 'new-password',
    showStrength: true
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    icon: Shield,
    required: true,
    autoComplete: 'new-password'
  }
];
