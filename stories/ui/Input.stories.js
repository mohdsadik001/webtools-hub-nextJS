import Input from "@/components/ui/Input";
import { Lock, Mail, Phone, User } from "lucide-react";

export default {
  title: 'UI/Input (Universal)',
  component: Input,
  tags: ['autodocs'],
};

export const BasicInputs = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input placeholder="Basic input" />
      <Input variant="filled" placeholder="Filled variant" />
      <Input variant="outlined" placeholder="Outlined variant" />
      <Input variant="minimal" placeholder="Minimal variant" />
    </div>
  ),
};

export const FormFields = {
  render: () => (
    <div className="space-y-4 w-96">
      <Input 
      leftIcon={User}
        label="Full Name"
        placeholder="John Doe"
        required
        helperText="Enter your full name"
      />
      <Input 
        label="Email"
        type="email"
        placeholder="user@example.com"
        leftIcon={Mail}
        required
      />
      <Input 
      leftIcon={Lock}
        label="Password"
        type="password"
        placeholder="••••••••"
        showPasswordToggle
        required
        successText="Strong password!"
      />
    </div>
  ),
};

export const ValidatorExamples = {
  render: () => (
    <div className="space-y-6 w-96">
      <Input 
        label="Email Validator"
        type="email"
        placeholder="user@example.com"
        leftIcon={Mail}
        errorText="Invalid email format"
      />
      <Input 
        label="Phone Validator" 
        type="tel"
        placeholder="9876543210"
        leftIcon={Phone}
        successText="Valid phone number!"
      />
    </div>
  ),
};
