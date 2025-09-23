'use client';
import FormField from '../ui/FormField';
import PasswordInput from '../ui/PasswordInput';
import PasswordStrength from '../ui/PasswordStrength';

export default function FormFieldsRenderer({ 
  fields, 
  formData, 
  fieldErrors, 
  onChange, 
  disabled = false 
}) {
  return (
    <>
      {fields.map((field) => {
        const commonProps = {
          key: field.id,
          id: field.id,
          name: field.name,
          label: field.label,
          placeholder: field.placeholder,
          value: formData[field.name],
          onChange: onChange,
          error: fieldErrors[field.name],
          required: field.required,
          autoComplete: field.autoComplete,
          disabled: disabled,
          icon: field.icon
        };

        if (field.type === 'password') {
          return (
            <div key={field.id} className="space-y-2">
              <PasswordInput {...commonProps} />
              {field.showStrength && field.name === 'password' && (
                <PasswordStrength password={formData[field.name]} />
              )}
              {field.name === 'confirmPassword' && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="text-xs text-green-600 flex items-center gap-1">
                  ✓ Passwords match
                </div>
              )}
            </div>
          );
        }

        return <FormField {...commonProps} type={field.type} />;
      })}
    </>
  );
}
