/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, InputAdornment, IconButton, Snackbar, Alert, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './login.module.css';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { VerifyForgetPasswordToken, ForgetPassword } from './credentials';

const FieldForgetPassword = () => {
    const { register, reset, handleSubmit, formState: { errors }, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [tokenValid, setTokenValid] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ severity: 'success', message: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const pathParts = location.pathname.split('/');
        const tokenFromUrl = pathParts[pathParts.length - 1];
        const verifyToken = async () => {
            try {
                const response = await VerifyForgetPasswordToken(tokenFromUrl);
                console.log(response);
                setTokenValid(true);
            } catch (error) {
                console.log(error);
                setTokenValid(false);
            } finally {
                setLoading(false);
            }
        };
        verifyToken();
    }, [location.pathname]);

    const onSubmit = async (data) => {
        setLoadingButton(true);
        try {
            const pathParts = location.pathname.split('/');
            const tokenFromUrl = pathParts[pathParts.length - 1];

            const new_password = {
                "new_password": data.confirmPassword,
                "token": tokenFromUrl
            };
            console.log(new_password);
            await ForgetPassword(new_password);
            setAlertInfo({ severity: 'success', message: 'Password Changed Successfully' });
            setOpenAlert(true);
            reset();
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            console.log(error);
            setAlertInfo({ severity: 'error', message: 'Failed to change password' });
            setOpenAlert(true);
        } finally {
            setLoadingButton(false);
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };
    const handleGoBack = () => {
        window.location.href = 'https://portal.affordablecare.ai';
    };

    if (loading) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${styles.main_login}`}>
                <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={styles.logo}>
                    <img src="/image/logo.svg" alt="logo" className={styles.logo_image} />
                </motion.div>
                <motion.div className={`${styles.main_login_top}`}>
                    <div className={`${styles.loginContainer} container mb-3 mt-5`} style={{ height: "" }}>
                        <Skeleton variant="rectangular" width="100%" height={60} />
                        <Skeleton variant="rectangular" width="100%" height={60} style={{ marginTop: '20px' }} />
                        <Skeleton variant="rectangular" width="100%" height={60} style={{ marginTop: '20px' }} />
                        <Skeleton variant="rectangular" width="100%" height={60} style={{ marginTop: '20px', marginBottom: "20px" }} />
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    if (tokenValid === false) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${styles.main_login}`}>
                <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={styles.logo}>
                    <img src="/image/logo.svg" alt="logo" className={styles.logo_image} />
                </motion.div>
                <motion.div className={`${styles.main_login_top}`}>
                    <div className={`${styles.loginContainer} container mb-2 mt-5`} style={{ height: "" }}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Token is verified valid.
                        </Alert>
                        <Button onClick={handleGoBack} variant="contained" color="primary" sx={{ mt: 2, marginBottom: '20px', textTransform: 'none' }}>
                            Go Back To Login
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`${styles.main_login}`}>
            <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className={styles.logo}>
                <img src="/image/logo.svg" alt="logo" className={styles.logo_image} />
            </motion.div>
            <motion.div className={`${styles.main_login_top}`}>
                <div className={`${styles.loginContainer} container mb-3 mt-5`} style={{ height: "" }}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <h5 className="text-center mt-2 pb-2" style={{ color: "#262f68", textTransform: "capitalize", fontWeight: "400" }}>Reset Password</h5>

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
                            <div className="col-md-12 mb-4">
                                <label htmlFor="password" className="form-label" style={{ color: "#262f68" }}>Password:</label>
                                <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    className={`${styles.textfield} ${errors.password ? 'is-invalid' : ''} col-md-6`}
                                    id="outlined-start-adornment"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'At least 8 characters',
                                        },

                                    })}
                                    error={!!errors.password}
                                    InputProps={{
                                        className: styles.input,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handlePasswordVisibility}
                                                    edge="end"
                                                    sx={{
                                                        '&:focus': { outline: 'none' },
                                                    }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    helperText={errors.password && errors.password.message}
                                />
                            </div>

                            <div className="col-md-12 mb-4">
                                <label htmlFor="confirmPassword" className="form-label" style={{ color: "#262f68" }}>Confirm Password:</label>
                                <TextField
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className={`${styles.textfield} ${errors.confirmPassword ? 'is-invalid' : ''} col-md-6`}
                                    id="outlined-start-adornment"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: value => value === watch('password') || 'Passwords do not match'
                                    })}
                                    error={!!errors.confirmPassword}
                                    InputProps={{
                                        className: styles.input,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleConfirmPasswordVisibility}
                                                    edge="end"
                                                    sx={{
                                                        '&:focus': { outline: 'none' },
                                                    }}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    helperText={errors.confirmPassword && errors.confirmPassword.message}
                                />
                            </div>
                        </div>
                        <motion.button type="submit" className={`${styles.submitButton} mt-1 mb-4`}>
                            {loadingButton ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Change Password'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FieldForgetPassword;
