import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);

    const handleLogin = () => {
        setIsEmailValid(email.includes('@')); // Basic email validation
        setIsPasswordValid(password.length > 5); // Basic password length check

        if (isEmailValid && isPasswordValid) {
            navigate('/dashboard'); // Adjust navigation as needed
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center align-center">
                {/* Email input */}
            <div className="mb-6">
                <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isEmailValid === false ? 'text-red-700 dark:text-red-500' : 'text-green-700 dark:text-green-500'}`}>
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full p-2.5 rounded-lg text-sm focus:ring-4 focus:outline-none ${
                        isEmailValid === false ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:border-red-500' : 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:border-green-500'
                    }`}
                    placeholder="Enter your email"
                />
                {isEmailValid === false ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Invalid email!</span> Please enter a valid email address.</p>
                ) : isEmailValid ? (
                    <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Great!</span> Email looks good.</p>
                ) : null}
            </div>

            {/* Password input */}
            <div className="mb-6">
                <label htmlFor="password" className={`block mb-2 text-sm font-medium ${isPasswordValid === false ? 'text-red-700 dark:text-red-500' : 'text-green-700 dark:text-green-500'}`}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full p-2.5 rounded-lg text-sm focus:ring-4 focus:outline-none ${
                        isPasswordValid === false ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:border-red-500' : 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:border-green-500'
                    }`}
                    placeholder="Enter your password"
                />
                {isPasswordValid === false ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Password too short!</span> Must be at least 6 characters.</p>
                ) : isPasswordValid ? (
                    <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Good!</span> Password looks valid.</p>
                ) : null}
            </div>

            {/* Login button */}
            <div className="flex flex-col">
                <button
                    type="button"
                    onClick={handleLogin}
                >
                    Log in
                </button>
                <button type="button" onClick={() => navigate('/signup')}>Want to create a new account?</button>
            </div>
            </div>
        </div>
    );
};

export default Login;