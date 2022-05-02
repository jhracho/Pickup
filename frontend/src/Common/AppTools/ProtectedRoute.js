import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({component: Component, flag, path, redirectPath}) => {
    
    // based on flag, return either a route to the path and component (if authorized to access it)
    // or return a redirect to the redirectPath if not authorized
    return (
        <div>
        { flag ? (
            <Route path={path} component={Component}/>
        ) : (
            <Redirect to={redirectPath} />
        )}
        </div>
    )
};

export default ProtectedRoute;