'use client';
import FormField from '../ui/FormField';

export default function ContactFormFields({ 
  fields, 
  formData, 
  fieldErrors, 
  onChange, 
  disabled = false,
  t 
}) {
  return (
    <>
      {fields.map((field) => {
        const commonProps = {
          key: field.id,
          id: field.id,
          name: field.name,
          label: field.label,
          placeholder: t(field.placeholderKey),
          value: formData[field.name] || '',
          onChange: onChange,
          error: fieldErrors[field.name],
          required: field.required,
          autoComplete: field.autoComplete,
          disabled: disabled,
          icon: field.icon
        };

        if (field.type === 'textarea') {
          return (
            <div key={field.id} className="space-y-2">
              <label 
                htmlFor={field.id} 
                className="block text-sm font-semibold text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              <div className="relative">
                {field.icon && (
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <field.icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  </div>
                )}
                
                <textarea
                  id={field.id}
                  name={field.name}
                  rows={field.rows || 4}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={onChange}
                  className={`block w-full ${field.icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-none ${
                    fieldErrors[field.name] 
                      ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                  placeholder={t(field.placeholderKey)}
                  aria-describedby={fieldErrors[field.name] ? `${field.id}-error` : undefined}
                  aria-invalid={fieldErrors[field.name] ? 'true' : 'false'}
                  disabled={disabled}
                />
              </div>
              
              {fieldErrors[field.name] && (
                <p id={`${field.id}-error`} className="text-red-600 text-sm flex items-center gap-1" role="alert">
                  <AlertCircle className="w-4 h-4" aria-hidden="true" />
                  {fieldErrors[field.name]}
                </p>
              )}
            </div>
          );
        }

        return <FormField {...commonProps} type={field.type} />;
      })}
    </>
  );
}
