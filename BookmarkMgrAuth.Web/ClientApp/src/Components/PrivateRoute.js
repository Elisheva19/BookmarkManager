import React from 'react';
import { useBookmarkContext } from '../BookmarkContext';
import Login from '../Pages/Login';
import { Route } from 'react-router-dom';


const PrivateRoute = ({ component, ...options }) => {
    const { user } = useBookmarkContext();
    const finalComponent = !!user ? component : Login;
    return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
