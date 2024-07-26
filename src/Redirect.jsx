/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

const Redirect = () => {
    useEffect(() => {
        window.location.href = 'https://portal.affordablecare.ai';
    }, []);

    return (
        <div>
            Redirecting...
        </div>
    );
}

export default Redirect;
