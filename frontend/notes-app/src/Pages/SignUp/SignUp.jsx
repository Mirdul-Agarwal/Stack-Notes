

import React, { useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { GoogleLogin } from '@react-oauth/google';
import Toast from '../../components/ToastMessage/Toast';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ isShown: false, message: "", type: "" });

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!name) {
            setError("Please enter your name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password,
            });

            if (response.data && response.data.error) {
                setError(response.data.message);
                setIsSubmitting(false);
                return;
            }

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                setToast({ isShown: true, message: "Account created successfully!", type: "success" });
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            setIsSubmitting(false);
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            const { credential } = response;
            const res = await axiosInstance.post("/auth/google", { token: credential });

            if (res.data && res.data.accessToken) {
                localStorage.setItem("token", res.data.accessToken);
                setToast({ isShown: true, message: "Sign up successful with Google!", type: "success" });
                navigate("/dashboard");
            }
        } catch (error) {
            setToast({ isShown: true, message: "Google sign-up failed!", type: "error" });
        }
    };

    const handleGoogleFailure = () => {
        setToast({ isShown: true, message: "Google sign-up failed!", type: "error" });
    };

    return (
        <>
            <Navbar />
            <Toast isShown={toast.isShown} message={toast.message} type={toast.type} onClose={() => setToast({ isShown: false })} />
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleSignUp}>
                        <h4 className='text-2xl mb-7'>Sign Up</h4>
                        <input
                            type="text"
                            placeholder="Name"
                            className="input-box"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button type='submit' className='btn-primary bg-green-500 hover:bg-green-600' disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </button>
                        <p className='text-sm text-center mt-4'>
                            Already have an account?{" "}
                            <Link to="/login" className='font-medium text-primary underline'>
                                Login
                            </Link>
                        </p>
                    </form>
                    <div className="mt-4">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
