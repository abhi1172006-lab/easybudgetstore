import React, { createContext, useContext, useState, useEffect } from 'react';
import { getVerifiedOwner, sendOwnerOtp, signOutOwner, verifyOwnerOtp } from '../lib/ownerAuth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVerifiedOwner().then(setUser).finally(() => setLoading(false));
  }, []);

  const requestOtp = async (email) => {
    await sendOwnerOtp(email);
  };

  const verifyOtp = async (email, code) => {
    const verifiedUser = await verifyOwnerOtp(email, code);
    setUser(verifiedUser);
    return verifiedUser;
  };

  const logout = async () => {
    await signOutOwner();
    setUser(null);
  };

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, requestOtp, verifyOtp, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
