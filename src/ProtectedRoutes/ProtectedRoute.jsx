import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(state => state.auth)
    const [shouldNavigate, setShouldNavigate] = useState(false);

    useEffect(() => {
      const storedVerifiedEmail = localStorage.getItem(`verifiedEmail${user?.uid}`);
      const handleNavigation = async () => {
        if (!user || !storedVerifiedEmail ) {
          setShouldNavigate(true);
        }
      };
      handleNavigation();
    }, [user]);

  
    return shouldNavigate ? <Navigate to="/" /> : user ? children : null;
};

export default ProtectedRoute;
