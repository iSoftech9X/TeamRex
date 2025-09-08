// // import React, { useState } from 'react';
// // import { MessageCircle, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
// // import { registerUser, loginUser } from '../services/authService';

// // const LoginPage = ({ onLogin }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [fullName, setFullName] = useState('');
// //   const [isRegister, setIsRegister] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     try {
// //     if (isRegister) {
// //         // Registration validation
// //       if (password !== confirmPassword) {
// //           setError('Passwords do not match!');
// //           setLoading(false);
// //         return;
// //       }
// //       if (password.length < 6) {
// //           setError('Password must be at least 6 characters long!');
// //           setLoading(false);
// //         return;
// //       }
// //         if (!fullName.trim()) {
// //           setError('Full name is required!');
// //           setLoading(false);
// //           return;
// //         }

// //         // Call register API
// //         const registerData = await registerUser({
// //           fullName: fullName.trim(),
// //           email: email.trim(),
// //           password: password
// //         });

// //         console.log('Registration successful:', registerData);
// //         alert('Registration successful! Please login with your credentials.');
        
// //         // Switch to login mode after successful registration
// //         setIsRegister(false);
// //         setPassword('');
// //         setConfirmPassword('');
// //         setFullName('');
// //       } else {
// //         // Login validation
// //         if (!email.trim() || !password) {
// //           setError('Email and password are required!');
// //           setLoading(false);
// //           return;
// //         }

// //         // Call login API
// //         const loginData = await loginUser({
// //           email: email.trim(),
// //           password: password
// //         });

// //         console.log('Login successful:', loginData);
// //         onLogin(loginData.user || loginData);
// //     }
// //     } catch (error) {
// //       console.error('Authentication error:', error);
// //       setError(error.message || 'An error occurred. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
// //         {/* Logo */}
// //         <div className="flex justify-center mb-6">
// //           <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
// //             <MessageCircle className="w-8 h-8 text-white" />
// //           </div>
// //         </div>

// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-2xl font-bold text-gray-900 mb-2">
// //             {isRegister ? 'Create Account' : 'Welcome Back'}
// //           </h1>
// //           <p className="text-gray-600">
// //             {isRegister ? 'Join us to start messaging' : 'Sign in to start messaging'}
// //           </p>
// //         </div>

// //         {/* Error Message */}
// //         {error && (
// //           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
// //             {error}
// //           </div>
// //         )}

// //         {/* Form */}
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {isRegister && (
// //             <div>
// //               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Full Name
// //               </label>
// //               <div className="relative">
// //                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                 <input
// //                   type="text"
// //                   id="fullName"
// //                   value={fullName}
// //                   onChange={(e) => setFullName(e.target.value)}
// //                   placeholder="Enter your full name"
// //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
// //                   required={isRegister}
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           <div>
// //             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// //               Email
// //             </label>
// //             <div className="relative">
// //               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 type="email"
// //                 id="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 placeholder="Enter your email"
// //                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// //               Password
// //             </label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 type={showPassword ? "text" : "password"}
// //                 id="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 placeholder="Enter your password"
// //                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
// //               >
// //                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //               </button>
// //             </div>
// //           </div>

// //           {isRegister && (
// //             <div>
// //               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Confirm Password
// //               </label>
// //               <div className="relative">
// //                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                 <input
// //                   type={showConfirmPassword ? "text" : "password"}
// //                   id="confirmPassword"
// //                   value={confirmPassword}
// //                   onChange={(e) => setConfirmPassword(e.target.value)}
// //                   placeholder="Confirm your password"
// //                   className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
// //                   required={isRegister}
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
// //                 >
// //                   {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform ${
// //               loading 
// //                 ? 'bg-gray-400 cursor-not-allowed' 
// //                 : 'bg-purple-600 hover:bg-purple-700 hover:scale-[1.02]'
// //             } text-white`}
// //           >
// //             {loading 
// //               ? (isRegister ? 'Creating Account...' : 'Signing In...') 
// //               : (isRegister ? 'Create Account' : 'Sign In')
// //             }
// //           </button>
// //         </form>

// //         {/* Toggle between Login and Register */}
// //         <div className="text-center mt-6">
// //           <button
// //             onClick={() => setIsRegister(!isRegister)}
// //             className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
// //           >
// //             {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
// //           </button>
// //         </div>

// //         {/* Terms and Privacy for Register */}
// //         {isRegister && (
// //           <div className="text-center mt-4">
// //             <p className="text-xs text-gray-500">
// //               By creating an account, you agree to our{' '}
// //               <button className="text-purple-600 hover:text-purple-700 underline">
// //                 Terms of Service
// //               </button>{' '}
// //               and{' '}
// //               <button className="text-purple-600 hover:text-purple-700 underline">
// //                 Privacy Policy
// //               </button>
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;
// import React, { useState } from 'react';
// import { MessageCircle, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
// import { registerUser, loginUser } from '../services/authService';

// const LoginPage = ({ onLogin }) => {
//   // Form state
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [isRegister, setIsRegister] = useState(false);
  
//   // UI state
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Role and timezone for registration
//   const [role, setRole] = useState('USER');
//   const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       if (isRegister) {
//         // Registration validation
//         if (password !== confirmPassword) {
//           setError('Passwords do not match!');
//           setLoading(false);
//           return;
//         }
//         if (password.length < 6) {
//           setError('Password must be at least 6 characters long!');
//           setLoading(false);
//           return;
//         }
//         if (!username.trim()) {
//           setError('Username is required!');
//           setLoading(false);
//           return;
//         }

//         // Call register API
//         const registerData = await registerUser({
//           username: username.trim(),
//           email: email.trim(),
//           password: password,
//           role,
//           timezone
//         });

//         console.log('Registration successful:', registerData);
//         setSuccess('Registration successful! Please login with your credentials.');
        
//         // Clear form and switch to login
//         setIsRegister(false);
//         setPassword('');
//         setConfirmPassword('');
//       } else {
//         // Login validation
//         if (!email.trim() || !password) {
//           setError('Email and password are required!');
//           setLoading(false);
//           return;
//         }

//         // Call login API
//         const loginData = await loginUser({
//           email: email.trim(),
//           password: password
//         });

//         console.log('Login successful:', loginData);
//         onLogin(loginData.user || loginData);
//       }
//     } catch (error) {
//       console.error('Authentication error:', error);
//       setError(error.response?.data?.message || error.message || 'An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
//             <MessageCircle className="w-8 h-8 text-white" />
//           </div>
//         </div>

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {isRegister ? 'Create Account' : 'Welcome Back'}
//           </h1>
//           <p className="text-gray-600">
//             {isRegister ? 'Join us to start messaging' : 'Sign in to start messaging'}
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
//             {success}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {isRegister && (
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
//                 Username
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   id="username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter your username"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           {isRegister && (
//             <>
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm your password"
//                     className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div> 
//                 <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
//                   Role
//                 </label>
//                 <select
//                   id="role"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
//                 >
//                   <option value="USER">User</option>
//                   <option value="ADMIN">Admin</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
//                   Timezone
//                 </label>
//                 <select
//                   id="timezone"
//                   value={timezone}
//                   onChange={(e) => setTimezone(e.target.value)}
//                   className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
//                 >
//                   <option value="America/New_York">Eastern Time (ET)</option>
//                   <option value="America/Chicago">Central Time (CT)</option>
//                   <option value="America/Denver">Mountain Time (MT)</option>
//                   <option value="America/Los_Angeles">Pacific Time (PT)</option>
//                   <option value="UTC">UTC</option>
//                 </select>
//               </div>
//             </>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform ${
//               loading 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-purple-600 hover:bg-purple-700 hover:scale-[1.02]'
//             } text-white`}
//           >
//             {loading 
//               ? (isRegister ? 'Creating Account...' : 'Signing In...') 
//               : (isRegister ? 'Create Account' : 'Sign In')
//             }
//           </button>
//         </form>

//         {/* Toggle between Login and Register */}
//         <div className="text-center mt-6">
//           <button
//             onClick={() => {
//               setIsRegister(!isRegister);
//               setError('');
//               setSuccess('');
//             }}
//             className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
//           >
//             {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
//           </button>
//         </div>

//         {/* Terms and Privacy for Register */}
//         {isRegister && (
//           <div className="text-center mt-4">
//             <p className="text-xs text-gray-500">
//               By creating an account, you agree to our{' '}
//               <button className="text-purple-600 hover:text-purple-700 underline">
//                 Terms of Service
//               </button>{' '}
//               and{' '}
//               <button className="text-purple-600 hover:text-purple-700 underline">
//                 Privacy Policy
//               </button>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// components/LoginPage.js
import React, { useState } from 'react';
import { MessageCircle, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { registerUser, loginUser } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Role and timezone for registration
  const [role, setRole] = useState('USER');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isRegister) {
        // Registration validation
        if (password !== confirmPassword) {
          setError('Passwords do not match!');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters long!');
          setLoading(false);
          return;
        }
        if (!username.trim()) {
          setError('Username is required!');
          setLoading(false);
          return;
        }

        // Call register API
        const registerData = await registerUser({
          username: username.trim(),
          email: email.trim(),
          password: password,
          role,
          timezone
        });

        console.log('Registration successful:', registerData);
        setSuccess('Registration successful! Please login with your credentials.');
        
        // Clear form and switch to login
        setIsRegister(false);
        setPassword('');
        setConfirmPassword('');
      } else {
        // Login validation
        if (!email.trim() || !password) {
          setError('Email and password are required!');
          setLoading(false);
          return;
        }

        // Call login API
        const loginData = await loginUser({
          email: email.trim(),
          password: password
        });

        console.log('Login successful:', loginData);
        
        // Extract user and token from response (handle different formats)
        let userData, authToken;
        
        if (loginData.user && loginData.token) {
          // Standard format: { user: {...}, token: "..." }
          userData = loginData.user;
          authToken = loginData.token;
        } else if (loginData.data && loginData.data.user && loginData.data.token) {
          // Axios response format: { data: { user: {...}, token: "..." } }
          userData = loginData.data.user;
          authToken = loginData.data.token;
        } else if (loginData.id && loginData.token) {
          // User object with embedded token
          userData = loginData;
          authToken = loginData.token;
        } else if (loginData.id) {
          // User object without token
          userData = loginData;
          // Try to get token from localStorage or assume it's in response
          authToken = loginData.token || localStorage.getItem('token');
        } else {
          throw new Error('Invalid response format from server');
        }

        // Use the AuthContext login function
        login(userData, authToken);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isRegister ? 'Join us to start messaging' : 'Sign in to start messaging'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isRegister && (
            <>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div> 
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  id="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 hover:scale-[1.02]'
            } text-white`}
          >
            {loading 
              ? (isRegister ? 'Creating Account...' : 'Signing In...') 
              : (isRegister ? 'Create Account' : 'Sign In')
            }
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
              setSuccess('');
            }}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>

        {/* Terms and Privacy for Register */}
        {isRegister && (
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <button className="text-purple-600 hover:text-purple-700 underline">
                Terms of Service
              </button>{' '}
              and{' '}
              <button className="text-purple-600 hover:text-purple-700 underline">
                Privacy Policy
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;