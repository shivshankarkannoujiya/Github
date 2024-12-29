// import React from 'react'

const Signup = () => {
    return (
        <div className="bg-black text-white min-h-screen flex justify-center items-center">
            <div className="max-w-4xl w-full flex flex-col md:flex-row">
                {/* Left Section */}
                <div className="flex-1 p-8 mb-30">
                    <h1 className="text-4xl font-bold mb-4">
                        Create your free account
                    </h1>
                    <p className="mb-8">
                        Explore GitHub’s core features for individuals and
                        organizations.
                    </p>
                </div>

                {/* Right Section */}
                <div className="bg-white text-black p-8 rounded-md shadow-lg flex-1">
                    <h2 className="text-2xl font-semibold mb-4">
                        Sign up to GitHub
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border border-gray-300 rounded-md p-2"
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
                                type="password"
                                id="password"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                            <small className="text-gray-500">
                                Password should be at least 15 characters OR at
                                least 8 characters including a number and a
                                lowercase letter.
                            </small>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                            <small className="text-gray-500">
                                Username may only contain alphanumeric
                                characters or single hyphens and cannot begin or
                                end with a hyphen.
                            </small>
                        </div>
                        <button
                            type="submit"
                            className="w-full  bg-green-600 hover:bg-green-700 text-white py-2 rounded focus:outline-none focus:ring focus:ring-green-500"
                        >
                            Continue →
                        </button>
                    </form>
                    <p className="mt-4 text-xs text-gray-500">
                        By creating an account, you agree to the{" "}
                        <span className="text-blue-500">Terms of Service</span>.
                        For more information about GitHub’s privacy practices,
                        see the{" "}
                        <span className="text-blue-500">
                            GitHub Privacy Statement
                        </span>
                        . We’ll occasionally send you account-related emails.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
