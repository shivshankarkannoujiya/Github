import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../authContext";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                    username: username,
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
            console.error("Error signUp User: ", error);
            const errorMessage =
                error.response?.data?.message || "Signup Failed!";
            alert(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="bg-black text-white min-h-screen flex justify-center items-center">
            <div className="max-w-4xl w-full flex flex-col md:flex-row">
                {/*TODO: Left Section */}
                <div className="flex-1 p-8 mb-30">
                    <h1 className="text-4xl font-bold mb-4">
                        Create your free account
                    </h1>
                    <p className="mb-8">
                        Explore GitHub’s core features for individuals and
                        organizations.
                    </p>
                </div>

                {/*TODO: Right Section */}
                <div className="bg-gray-900 text-white p-8 rounded-md shadow-lg flex-1">
                    <h2 className="text-2xl font-semibold mb-4">
                        Sign up to GitHub
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                autoComplete="off"
                                type="text"
                                id="username"
                                className="w-full border bg-gray-900 border-gray-300 rounded-md p-2 outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                autoComplete="off"
                                type="email"
                                id="email"
                                className="w-full border bg-gray-900 border-gray-300 rounded-md p-2 outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                autoComplete="off"
                                type="password"
                                id="password"
                                className="w-full border bg-gray-900 border-gray-300 rounded-md p-2 outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded focus:outline-none focus:ring focus:ring-green-500"
                            disabled={loading}
                            onClick={handleSignUp}
                        >
                            {loading ? "Loading..." : "Signup"}
                        </button>
                    </form>
                    {/*TODO: Already have an account Section */}
                    <div className="mt-4 text-sm text-center border-t border-gray-700 pt-6">
                        <p className="mt-6 text-sm text-center">
                            <span className="mr-2">
                                Already have an account?
                            </span>
                            <Link to="/auth" className="text-blue-600">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
