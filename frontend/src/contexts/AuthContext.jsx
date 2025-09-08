// // import React, { createContext, useContext, useEffect, useState } from 'react';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [currentUser, setCurrentUser] = useState(() => {
// //     const storedUser = localStorage.getItem('user');
// //     return storedUser ? JSON.parse(storedUser) : null;
// //   });

// //   const login = (userData) => {
// //     localStorage.setItem('user', JSON.stringify(userData));
// //     setCurrentUser(userData);
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('user');
// //     setCurrentUser(null);
// //   };

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem('user');
// //     if (storedUser) {
// //       setCurrentUser(JSON.parse(storedUser));
// //     }
// //   }, []);

// //   return (
// //     <AuthContext.Provider value={{ currentUser, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };



// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   // Load user from localStorage once when app starts
// useEffect(() => {
//   const storedUser = localStorage.getItem('user');
//   if (storedUser) {
//     setCurrentUser(JSON.parse(storedUser));
//   }
// }, []);

// const login = (userData) => {
//   setCurrentUser(userData);
//   localStorage.setItem('user', JSON.stringify(userData)); 
// };


//   const logout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setCurrentUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
    isAuthenticated: !!currentUser && !!token,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};