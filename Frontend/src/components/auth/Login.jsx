// import React from "react";

import { useEffect, useState } from "react";
import { useAuth } from "../../authContext.jsx";
import axios from "axios";

const Login = () => {
    const { currentUser, setCurrentUser } = useAuth();
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setCurrentUser(null);
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const [currentUser, setCurrentUser] = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/login",
                {
                    email: email,
                    password: password,
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser(res.data.userId);
            setLoading(false);
            window.location.href = "/";
        } catch (error) {
            console.log("Error login User", error);
            const errorMessage =
                error.response?.data?.message || "Login Failed";
            alert(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-githubBg">
            <div className="bg-gray-900 text-white w-full max-w-sm p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <img
                        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                        alt="GitHub Logo"
                        className="h-12 w-12 rounded-full"
                    />
                </div>
                <h2 className="text-center text-xl font-semibold mb-4">
                    Sign in to GitHub
                </h2>
                <form>
                    <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="username"
                    >
                        Username or email address
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="w-full px-3 py-2 bg-githubBg text-white rounded focus:outline-none focus:ring focus:ring-blue-500 mb-4"
                        placeholder="Enter your username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full px-3 py-2 bg-githubBg text-white rounded focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex justify-between text-sm mb-4">
                        <a href="#" className="text-blue-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded focus:outline-none focus:ring focus:ring-green-500"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        Sign in
                    </button>
                </form>

                <div className="text-sm text-center border-t border-gray-700 pt-6 mt-10">
                    <a href="#" className="text-blue-500 hover:underline">
                        Sign in with a passkey
                    </a>
                </div>
                <div className="mt-4 text-sm text-center">
                    New to GitHub?{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                        Create an account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
