import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null); // For password validation
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null); // For email validation

    const handleSignUp = async () => {
        // Add basic email and password validation
        setIsEmailValid(email.includes('@')); // Simple email validation example
        setIsPasswordValid(password === checkPassword && password.length > 5); // Check passwords match and have length > 5

        if (isEmailValid && isPasswordValid) {
            navigate('/setup');
        }
    };

    return (
        <div> {/* Apply text-white to make all text white */}
            <div className="mb-6 mx-20 mt-10">
                <label htmlFor="email" className={`text-white block mb-2 text-sm font-medium ${isEmailValid === false ? 'text-red-300' : 'text-gray-500'}`}>
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`text-white block w-full p-2.5 rounded-lg text-sm focus:ring-4 focus:outline-none ${
                        isEmailValid === false ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:border-red-500' : 'bg-green-50 border border-green-500 text-white placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:border-green-500'
                    }`}
                    placeholder="Enter your email"
                />
                {isEmailValid === false ? (
                    <p className="mt-2 text-sm text-red-300"><span className="font-medium">Invalid email!</span> Please enter a valid email address.</p>
                ) : isEmailValid ? (
                    <p className="mt-2 text-sm text-green-300"><span className="font-medium">Great!</span> Email looks good.</p>
                ) : null}
            </div>

            <div className="mb-6 mx-20">
                <label htmlFor="password" className="text-white block mb-2 text-sm font-medium text-gray-500">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-white block w-full p-2.5 rounded-lg text-sm border focus:ring-4 focus:outline-none dark:bg-gray-700"
                    placeholder="Enter your password"
                />
            </div>

            <div className="mb-6 mx-20 mb-10">
                <label htmlFor="checkPassword" className={`block mb-2 text-sm font-medium ${isPasswordValid === false ? 'text-red-300' : 'text-gray-500'}`}>
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="checkPassword"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    className={`text-white block w-full p-2.5 rounded-lg text-sm focus:ring-4 focus:outline-none ${
                        isPasswordValid === false ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 dark:border-red-500' : 'bg-green-50 border border-green-500 text-white placeholder-green-700 focus:ring-green-500 dark:bg-gray-700 dark:border-green-500'
                    }`}
                    placeholder="Confirm your password"
                />
                {isPasswordValid === false ? (
                    <p className="mt-2 text-sm text-red-300"><span className="font-medium">Passwords do not match!</span> Please try again.</p>
                ) : isPasswordValid ? (
                    <p className="mt-2 text-sm text-green-300"><span className="font-medium">Perfect!</span> Passwords match.</p>
                ) : null}
            </div>

            <div className="flex flex-col">
                <button type="button" onClick={handleSignUp}>Create an account</button>
                <button type="button" onClick={() => navigate('/login')}>Already have an account?</button>
            </div>
        </div>
    );
};

export default SignUp;
