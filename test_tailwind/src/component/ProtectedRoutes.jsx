import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoutes = () => {
    const [auth, setAuth] = useState(false);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [actionTaken, setActionTaken] = useState('');
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3001/checkauth', { withCredentials: true });

                if (response.data.message != "No token found") {
                    setAuth(true);
                    setRole(response.data.user.role);
                    setActionTaken(response.data.user.action);
                }
            } catch (err) {
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <main className="flex justify-center items-center h-screen bg-gray-200">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
                    <span className="sr-only">Loading...</span>
                </div>
            </main>
        );
        
    }

    const isAdminRoute = location.pathname === '/admin' || 
                        location.pathname === '/users' || 
                        location.pathname === '/products';

    if (!auth) {
        return <Navigate to="/login" />;
    }

    if(actionTaken !== 'Suspended' && actionTaken !== 'Removed'){
        if (isAdminRoute && role !== 'admin') {
            return <Navigate to="/home" />;
        }
        
        if (!isAdminRoute && role === 'admin') {
            return <Navigate to="/admin" />;
        }
    }else if(actionTaken === 'Removed'){
        return <Navigate to="/removed" />;
    }else{
        return <Navigate to="/suspended" />;
    }
    return <Outlet />;
};

export default ProtectedRoutes;