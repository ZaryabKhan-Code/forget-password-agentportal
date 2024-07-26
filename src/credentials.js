import axios from "axios";
const BASE_URL = "https://agentportalbackend-c01aed9096b5.herokuapp.com";

export const ForgetPasswordGetToken = (data) => {
    return axios.post(`${BASE_URL}/users/forget_password?email=${data}`, {
    });
};


export const VerifyForgetPasswordToken = (token) => {
    return axios.get(`${BASE_URL}/users/getverify/forgot-password`, {
        params: {
            token: token
        }
    });
};

export const ForgetPassword = (data) => {
    return axios.post(`${BASE_URL}/users/forget_change_password`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const Register = (formData) => {
    return axios.post(`${BASE_URL}/users/add`, formData);
};
export const Authenticate = (formData) => {
    return axios.post(`${BASE_URL}/users/login`, formData);
};
export const ValidateToken = (token) => {
    return axios.get(`${BASE_URL}/users/token_validatiy`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const RefreshTokenHighlevel = (token, payload) => {
    payload = {
        "userId": payload
    }

    return axios.post(`${BASE_URL}/highlevel_authentication/refresh_token`, payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
