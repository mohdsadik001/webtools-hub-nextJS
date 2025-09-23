// 'use client';
// import { useState, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { signIn } from 'next-auth/react';
// import ReCaptcha from '@/components/backend/ReCaptcha';
// import { Eye, EyeOff, User, Mail, Lock, Shield, AlertCircle, CheckCircle2, Loader2, UserPlus } from 'lucide-react';

// export default function SignUp() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [recaptchaToken, setRecaptchaToken] = useState(null);
//   const [fieldErrors, setFieldErrors] = useState({});
//   const [passwordStrength, setPasswordStrength] = useState(0);
  
//   const recaptchaRef = useRef();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Password strength checker
//   const checkPasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[a-z]/.test(password)) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;
//     return strength;
//   };

//   const getPasswordStrengthText = (strength) => {
//     switch (strength) {
//       case 0:
//       case 1: return { text: 'Very Weak', color: 'text-red-600' };
//       case 2: return { text: 'Weak', color: 'text-red-500' };
//       case 3: return { text: 'Fair', color: 'text-yellow-500' };
//       case 4: return { text: 'Good', color: 'text-blue-500' };
//       case 5: return { text: 'Strong', color: 'text-green-600' };
//       default: return { text: '', color: '' };
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
    
//     // Update password strength
//     if (name === 'password') {
//       setPasswordStrength(checkPasswordStrength(value));
//     }
    
//     // Clear errors when user starts typing
//     setError('');
//     if (fieldErrors[name]) {
//       setFieldErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleRecaptchaChange = (token) => {
//     setRecaptchaToken(token);
//     setError('');
//   };

//   const handleRecaptchaExpired = () => {
//     setRecaptchaToken(null);
//   };

//   const validateForm = () => {
//     const errors = {};
    
//     // Name validation
//     if (!formData.name.trim()) {
//       errors.name = 'Full name is required';
//     } else if (formData.name.trim().length < 2) {
//       errors.name = 'Name must be at least 2 characters';
//     }
    
//     // Email validation
//     if (!formData.email) {
//       errors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       errors.email = 'Please enter a valid email address';
//     }
    
//     // Password validation
//     if (!formData.password) {
//       errors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//     }
    
//     // Confirm password validation
//     if (!formData.confirmPassword) {
//       errors.confirmPassword = 'Please confirm your password';
//     } else if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = 'Passwords do not match';
//     }
    
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     // Validate form
//     if (!validateForm()) {
//       setLoading(false);
//       return;
//     }

//     if (!recaptchaToken) {
//       setError('Please complete the reCAPTCHA verification');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Step 1: Create user account via custom signup API
//       const signupResponse = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name.trim(),
//           email: formData.email,
//           password: formData.password,
//           recaptchaToken: recaptchaToken,
//         }),
//       });

//       const signupData = await signupResponse.json();

//       if (!signupResponse.ok) {
//         setError(signupData.error || 'Registration failed. Please try again.');
//         recaptchaRef.current?.reset();
//         setRecaptchaToken(null);
//         setLoading(false);
//         return;
//       }

//       // Step 2: Automatically sign in the user with NextAuth
//       setSuccess('Account created successfully! Signing you in...');
      
//       const result = await signIn('credentials', {
//         redirect: false,
//         email: formData.email,
//         password: formData.password,
//         recaptchaToken: recaptchaToken,
//       });

//       if (result?.error) {
//         // If auto-signin fails, redirect to manual signin
//         setSuccess('Account created! Please sign in with your credentials.');
//         setTimeout(() => {
//           router.push('/auth/signin');
//         }, 2000);
//       } else if (result?.ok) {
//         // Auto-signin successful
//         setSuccess('Account created and signed in successfully! Redirecting...');
//         setFormData({
//           name: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//         });
//         setPasswordStrength(0);
        
//         // Get callback URL or default to dashboard
//         const callbackUrl = searchParams.get('callbackUrl') || '/tools';
        
//         setTimeout(() => {
//           window.location.href = callbackUrl;
//         }, 2000);
//       }

//     } catch (error) {
//       console.error('Signup error:', error);
//       setError('Network error. Please check your connection and try again.');
//       recaptchaRef.current?.reset();
//       setRecaptchaToken(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const strengthData = getPasswordStrengthText(passwordStrength);

//   return (
//     <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-primary-dull rounded-full flex items-center justify-center mb-4">
//             <UserPlus className="w-8 h-8 text-white" aria-hidden="true" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Join WebTools Hub
//           </h1>
//           <p className="text-gray-600">
//             Create your account and get started
//           </p>
//         </div>

//         {/* Main Form Card */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
//           {/* Status Messages */}
//           <div role="status" aria-live="polite" className="sr-only">
//             {error && `Error: ${error}`}
//             {success && `Success: ${success}`}
//             {loading && 'Creating account, please wait...'}
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div 
//               className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
//               role="alert"
//               aria-describedby="error-message"
//             >
//               <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
//               <div>
//                 <p id="error-message" className="text-red-700 text-sm font-medium">
//                   {error}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Success Message */}
//           {success && (
//             <div 
//               className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
//               role="alert"
//               aria-describedby="success-message"
//             >
//               <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
//               <div>
//                 <p id="success-message" className="text-green-700 text-sm font-medium">
//                   {success}
//                 </p>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//             {/* Full Name Field */}
//             <div className="space-y-2">
//               <label 
//                 htmlFor="name" 
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Full Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   autoComplete="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
//                     fieldErrors.name 
//                       ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
//                       : 'border-gray-300 bg-white hover:border-gray-400'
//                   }`}
//                   placeholder="Enter your full name"
//                   aria-describedby={fieldErrors.name ? 'name-error' : undefined}
//                   aria-invalid={fieldErrors.name ? 'true' : 'false'}
//                   disabled={loading}
//                 />
//               </div>
//               {fieldErrors.name && (
//                 <p id="name-error" className="text-red-600 text-sm flex items-center gap-1" role="alert">
//                   <AlertCircle className="w-4 h-4" aria-hidden="true" />
//                   {fieldErrors.name}
//                 </p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="space-y-2">
//               <label 
//                 htmlFor="email" 
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   autoComplete="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
//                     fieldErrors.email 
//                       ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
//                       : 'border-gray-300 bg-white hover:border-gray-400'
//                   }`}
//                   placeholder="Enter your email address"
//                   aria-describedby={fieldErrors.email ? 'email-error' : undefined}
//                   aria-invalid={fieldErrors.email ? 'true' : 'false'}
//                   disabled={loading}
//                 />
//               </div>
//               {fieldErrors.email && (
//                 <p id="email-error" className="text-red-600 text-sm flex items-center gap-1" role="alert">
//                   <AlertCircle className="w-4 h-4" aria-hidden="true" />
//                   {fieldErrors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label 
//                 htmlFor="password" 
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   autoComplete="new-password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
//                     fieldErrors.password 
//                       ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
//                       : 'border-gray-300 bg-white hover:border-gray-400'
//                   }`}
//                   placeholder="Create a strong password"
//                   aria-describedby={`${fieldErrors.password ? 'password-error' : ''} password-strength`}
//                   aria-invalid={fieldErrors.password ? 'true' : 'false'}
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                   ) : (
//                     <Eye className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                   )}
//                 </button>
//               </div>
              
//               {/* Password Strength Indicator */}
//               {formData.password && (
//                 <div id="password-strength" className="mt-2">
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-xs text-gray-600">Password strength:</span>
//                     <span className={`text-xs font-medium ${strengthData.color}`}>
//                       {strengthData.text}
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-1.5">
//                     <div 
//                       className={`h-1.5 rounded-full transition-all duration-300 ${
//                         passwordStrength <= 1 ? 'bg-red-500' :
//                         passwordStrength === 2 ? 'bg-red-400' :
//                         passwordStrength === 3 ? 'bg-yellow-400' :
//                         passwordStrength === 4 ? 'bg-blue-500' : 'bg-green-500'
//                       }`}
//                       style={{ width: `${(passwordStrength / 5) * 100}%` }}
//                     />
//                   </div>
//                 </div>
//               )}
              
//               {fieldErrors.password && (
//                 <p id="password-error" className="text-red-600 text-sm flex items-center gap-1" role="alert">
//                   <AlertCircle className="w-4 h-4" aria-hidden="true" />
//                   {fieldErrors.password}
//                 </p>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="space-y-2">
//               <label 
//                 htmlFor="confirmPassword" 
//                 className="block text-sm font-semibold text-gray-700"
//               >
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Shield className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   required
//                   autoComplete="new-password"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 pr-12 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
//                     fieldErrors.confirmPassword 
//                       ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
//                       : formData.confirmPassword && formData.password === formData.confirmPassword
//                       ? 'border-green-300 bg-green-50'
//                       : 'border-gray-300 bg-white hover:border-gray-400'
//                   }`}
//                   placeholder="Confirm your password"
//                   aria-describedby={fieldErrors.confirmPassword ? 'confirm-password-error' : undefined}
//                   aria-invalid={fieldErrors.confirmPassword ? 'true' : 'false'}
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
//                   aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                   ) : (
//                     <Eye className="w-5 h-5 text-gray-400" aria-hidden="true" />
//                   )}
//                 </button>
//               </div>
//               {fieldErrors.confirmPassword && (
//                 <p id="confirm-password-error" className="text-red-600 text-sm flex items-center gap-1" role="alert">
//                   <AlertCircle className="w-4 h-4" aria-hidden="true" />
//                   {fieldErrors.confirmPassword}
//                 </p>
//               )}
//             </div>

//             {/* reCAPTCHA */}
//             <div className="flex justify-center py-2">
//               <ReCaptcha
//                 ref={recaptchaRef}
//                 onVerify={handleRecaptchaChange}
//                 onExpired={handleRecaptchaExpired}
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading || !recaptchaToken}
//               className={`w-full flex items-center justify-center gap-3 py-3 px-4 border border-transparent rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 ${
//                 loading || !recaptchaToken
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : 'bg-primary text-white hover:bg-primary-dull active:from-purple-800 active:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer'
//               }`}
//               aria-describedby="submit-button-status"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
//                   <span>Creating your account...</span>
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="w-5 h-5" aria-hidden="true" />
//                   <span>Create Account</span>
//                 </>
//               )}
//             </button>
            
//             <div id="submit-button-status" className="sr-only">
//               {loading && 'Form is being submitted, please wait'}
//               {!recaptchaToken && 'Please complete reCAPTCHA to enable create account button'}
//             </div>
//           </form>
//         </div>

//         {/* Sign In Link */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link 
//               href="/auth/signin" 
//               className="font-semibold text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-1 py-1 transition-colors"
//             >
//               Sign in here
//             </Link>
//           </p>
//         </div>

//         {/* Additional Help Text */}
//         <div className="mt-4 text-center">
//           <p className="text-xs text-gray-500">
//             By creating an account, you agree to our{' '}
//             <Link href="/terms" className="underline hover:text-gray-700 focus:text-gray-700">
//               Terms of Service
//             </Link>{' '}
//             and{' '}
//             <Link href="/privacy" className="underline hover:text-gray-700 focus:text-gray-700">
//               Privacy Policy
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return <SignUpForm />;
}
