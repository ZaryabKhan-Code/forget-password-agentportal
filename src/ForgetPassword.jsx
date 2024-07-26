/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, InputAdornment, IconButton, Snackbar, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './login.module.css';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ForgetPasswordGetToken } from './credentials';

const ForgetPassword = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ severity: 'success', message: '' });

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await ForgetPasswordGetToken(data.email);
            setAlertInfo({ severity: 'success', message: response.data.message });
            setOpenAlert(true);

        } catch (error) {
            console.log(error)
            if (error.response) {
                setAlertInfo({ severity: 'error', message: error.response.data || 'An error occurred' });
            } else {
                setAlertInfo({ severity: 'warning', message: 'Maintenance in progress. Try again later.' });
            }
            setOpenAlert(true);
        }
        reset();
        setLoading(false)
    };
    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${styles.main_login}`}>
            <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={styles.logo}>
                <img src="/image/logo.svg" alt="logo" className={styles.logo_image} />
            </motion.div>
            <motion.div className={`${styles.main_login_top}`}>
                <div className={`${styles.loginContainer} container mb-3 mt-5`} style={{ height: "" }}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <h5 className="text-center mt-2 pb-2" style={{ color: "#262f68", textTransform: "capitalize", fontWeight: "400" }}>Forgot Your Password?</h5>
                        <p className="text-center" style={{ color: "#262f68", marginBottom: "20px", textAlign: '' }}>
                            Enter your email address below and we'll send you instructions on how to reset your password.
                        </p>
                        <Snackbar open={openAlert} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            {openAlert && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                >
                                    <Alert onClose={handleCloseAlert} severity={alertInfo.severity} sx={{ width: '100%', marginBottom: "10px", '&:focus': { outline: 'none' } }}>
                                        {alertInfo.message}
                                    </Alert>
                                </motion.div>
                            )}
                        </Snackbar>
                        <div className='row'>
                            <div className="col-md-12 mb-3">
                                <label htmlFor="email" className="form-label" style={{ color: "#262f68" }}>Email:</label>
                                <TextField
                                    type="email"
                                    className={`${styles.textfield} ${errors.email ? 'is-invalid' : ''} col-md-6`}
                                    id="outlined-start-adornment"
                                    {...register('email', {
                                        required: 'Email is required',
                                    })}
                                    error={!!errors.email}
                                    InputProps={{
                                        className: styles.input,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email />
                                            </InputAdornment>
                                        ),
                                    }}
                                    helperText={errors.email && "Email is required"}
                                />
                            </div>
                        </div>
                        <motion.button type="submit" className={`${styles.submitButton} mt-1 mb-4`}>
                            {loading ? <><FontAwesomeIcon icon={faSpinner} size="xl" spin style={{ color: "#fff" }} /></> : <>Reset Password</>}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ForgetPassword;
