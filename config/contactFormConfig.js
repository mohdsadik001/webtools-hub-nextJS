import { User, Mail, MessageSquare } from 'lucide-react';

export const contactFormFields = [
  {
    id: 'user_name',
    name: 'user_name',
    type: 'text',
    label: 'Full Name',
    placeholderKey: 'namePlaceholder',
    icon: User,
    required: true,
    autoComplete: 'name'
  },
  {
    id: 'user_email',
    name: 'user_email',
    type: 'email',
    label: 'Email Address',
    placeholderKey: 'emailPlaceholder',
    icon: Mail,
    required: true,
    autoComplete: 'email'
  },
  {
    id: 'message',
    name: 'message',
    type: 'textarea',
    label: 'Message',
    placeholderKey: 'messagePlaceholder',
    icon: MessageSquare,
    required: true,
    rows: 5
  }
];
