import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [showToast, setShowToast] = useState({ isShown: false, message: "", type: "" });
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            await axiosInstance.post("/auth/forgot-password", { email });
            setOtpSent(true);
            setShowToast({ isShown: true, message: "OTP sent successfully!", type: "success" });
        } catch (error) {
            setShowToast({ isShown: true, message: "Failed to send OTP. Please try again.", type: "error" });
        }
    };

    const handleResetPassword = async () => {
        try {
            await axiosInstance.post("/auth/reset-password", { email, otp, newPassword });
            setShowToast({ isShown: true, message: "Password reset successfully!", type: "success" });
            setTimeout(() => {
                navigate("/login");
            }, 3000); // Wait for toast to be shown before redirecting
        } catch (error) {
            setShowToast({ isShown: true, message: "Failed to reset password. Please try again.", type: "error" });
        }
    };

    return (
        <>
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <h4 className='text-2xl mb-7'>{otpSent ? "Reset Password" : "Forgot Password"}</h4>
                    {!otpSent ? (
                        <>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="input-box"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                onClick={handleForgotPassword}
                                className='btn-primary bg-green-500 hover:bg-green-600'
                            >
                                Send OTP
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="input-box"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="input-box"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                onClick={handleResetPassword}
                                className='btn-primary bg-green-500 hover:bg-green-600'
                            >
                                Reset Password
                            </button>
                        </>
                    )}
                    <Toast
                        isShown={showToast.isShown}
                        message={showToast.message}
                        type={showToast.type}
                        onClose={() => setShowToast({ ...showToast, isShown: false })}
                    />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
