import React from 'react';
import { NavLink } from 'react-router-dom';

const C = () => {
    return (
        <div>
            <div className="m-t-xxl text-center">
                <h1 className="error-number">C</h1>
                <h3 className="m-b">Here goes the lesson!</h3>
                <h3 className="m-b">Coming Soon</h3>
                <NavLink to={'/dashboard/home'}>Go Home!</NavLink>
            </div>
        </div>
    );
};

export default C;
