'use client';

export default function PasswordStrength({ 
  password, 
  className = "" 
}) {
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return { text: 'Very Weak', color: 'text-red-600' };
      case 2: return { text: 'Weak', color: 'text-red-500' };
      case 3: return { text: 'Fair', color: 'text-yellow-500' };
      case 4: return { text: 'Good', color: 'text-blue-500' };
      case 5: return { text: 'Strong', color: 'text-green-600' };
      default: return { text: '', color: '' };
    }
  };

  if (!password) return null;

  const strength = checkPasswordStrength(password);
  const strengthData = getPasswordStrengthText(strength);

  return (
    <div id="password-strength" className={`mt-2 ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">Password strength:</span>
        <span className={`text-xs font-medium ${strengthData.color}`}>
          {strengthData.text}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full transition-all duration-300 ${
            strength <= 1 ? 'bg-red-500' :
            strength === 2 ? 'bg-red-400' :
            strength === 3 ? 'bg-yellow-400' :
            strength === 4 ? 'bg-blue-500' : 'bg-green-500'
          }`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}
