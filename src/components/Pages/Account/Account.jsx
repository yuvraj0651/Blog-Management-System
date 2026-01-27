import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../API/Thunk/AuthThunk";
import { useNavigate } from "react-router";

const Account = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("login");
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [registerData, setRegisterData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [loginErrors, setLoginErrors] = useState({});
    const [registerErrors, setRegisterErrors] = useState({});

    const [showLoginPassword, setShowLoginPassword] = useState("");
    const [showRegisterPassword, setShowRegisterPassword] = useState("");

    let inputRef = useRef();

    useEffect(() => {
        if (activeTab === "login" && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeTab]);

    const loginChangeHandler = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const registerChangeHandler = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateLogin = () => {
        let newLoginErrors = {};

        if (!loginData.email.trim()) {
            newLoginErrors.email = "Email is required";
        } else if (!validateEmail(loginData.email)) {
            newLoginErrors.email = "Enter a valid email address";
        }

        if (!loginData.password.trim()) {
            newLoginErrors.password = "Password is required";
        } else if (loginData.password.length < 6) {
            newLoginErrors.password = "Password must be at least 6 characters";
        }

        return newLoginErrors;
    };

    const validateRegister = () => {
        let newRegisterErrors = {};

        if (!registerData.fullName.trim()) {
            newRegisterErrors.fullName = "Full name is required";
        }

        if (!registerData.email.trim()) {
            newRegisterErrors.email = "Email is required";
        } else if (!validateEmail(registerData.email)) {
            newRegisterErrors.email = "Enter a valid email address";
        }

        if (!registerData.password.trim()) {
            newRegisterErrors.password = "Password is required";
        } else if (registerData.password.length < 6) {
            newRegisterErrors.password = "Password must be at least 6 characters";
        }

        return newRegisterErrors;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const loginValidateErr = validateLogin();
        setLoginErrors(loginValidateErr);

        if (Object.keys(loginValidateErr).length === 0) {
            dispatch(loginUser(loginData)).unwrap().then(() => {
                alert("Login Successfully");

                setTimeout(() => {
                    navigate("/");
                }, 700);

            }).catch((error) => {
                alert(error);
            });

            setLoginData({
                email: "",
                password: "",
            });

            setLoginErrors({});
        }

    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        const registerValidateErr = validateRegister();
        setRegisterErrors(registerValidateErr);

        if (Object.keys(registerValidateErr).length === 0) {
            dispatch(registerUser({
                fullName: registerData.fullName,
                email: registerData.email,
                password: registerData.password,
            })).unwrap().then(() => {
                alert("Registered Successfully");
            }).catch((error) => {
                alert(error);
            });

            setRegisterData({
                fullName: "",
                email: "",
                password: "",
            });

            setRegisterErrors({});
        }
    };

    const toggleLoginPassword = () => {
        setShowLoginPassword(!showLoginPassword);
    };

    const toggleRegisterPassword = () => {
        setShowRegisterPassword(!showRegisterPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black px-4">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                <div className="hidden md:flex flex-col justify-center bg-slate-900 text-white p-10">
                    <h2 className="text-3xl font-bold mb-4">
                        Welcome Back 👋
                    </h2>
                    <p className="text-slate-300 mb-8 leading-relaxed">
                        Login or register to explore blogs, save your favorite articles,
                        and manage your profile effortlessly.
                    </p>
                </div>

                <div className="p-8 sm:p-12">
                    <div className="flex gap-3 mb-8">
                        <button
                            type="button"
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2 rounded-lg font-semibold transition
                                ${activeTab === "login"
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-200 text-slate-700"}`}>
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("register")}
                            className={`flex-1 py-2 rounded-lg font-semibold transition
                                ${activeTab === "register"
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-200 text-slate-700"}`}>
                            Register
                        </button>
                    </div>
                    {
                        activeTab === "login" && (
                            <form onSubmit={handleLoginSubmit} className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800">
                                    Login to your account
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        ref={inputRef}
                                        value={loginData.email}
                                        onChange={loginChangeHandler}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                                    />
                                    {
                                        loginErrors.email && (
                                            <p className="text-red-600 text-sm mt-1">{loginErrors.email}</p>
                                        )
                                    }
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type={showLoginPassword ? "text" : "password"}
                                        name="password"
                                        value={loginData.password}
                                        onChange={loginChangeHandler}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                                    />
                                    {
                                        loginErrors.password && (
                                            <p className="text-red-600 text-sm mt-1">{loginErrors.password}</p>
                                        )
                                    }
                                    <span onClick={toggleLoginPassword} className="absolute top-9 right-3 capitalize font-[500] tracking-wide text-[0.9rem] cursor-pointer">
                                        {showLoginPassword ? "Hide" : "Show"}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">
                                    Login
                                </button>

                                <p className="text-sm text-center text-slate-600">
                                    Don’t have an account?{" "}
                                    <span
                                        onClick={() => setActiveTab("register")}
                                        className="text-slate-900 font-semibold cursor-pointer">
                                        Create one
                                    </span>
                                </p>
                            </form>
                        )
                    }
                    {
                        activeTab === "register" && (
                            <form onSubmit={handleRegisterSubmit} className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800">
                                    Create new account
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={registerData.fullName}
                                        onChange={registerChangeHandler}
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                                    />
                                    {
                                        registerErrors.fullName && (
                                            <p className="text-red-600 text-sm mt-1">{registerErrors.fullName}</p>
                                        )
                                    }
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={registerData.email}
                                        onChange={registerChangeHandler}
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                                    />
                                    {
                                        registerErrors.email && (
                                            <p className="text-red-600 text-sm mt-1">{registerErrors.email}</p>
                                        )
                                    }
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type={showRegisterPassword ? "text" : "password"}
                                        name="password"
                                        value={registerData.password}
                                        onChange={registerChangeHandler}
                                        placeholder="Create password"
                                        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                                    />
                                    {
                                        registerErrors.password && (
                                            <p className="text-red-600 text-sm mt-1">{registerErrors.password}</p>
                                        )
                                    }
                                    <span onClick={toggleRegisterPassword} className="absolute top-9 right-3 capitalize font-[500] tracking-wide text-[0.9rem] cursor-pointer">
                                        {showRegisterPassword ? "Hide" : "Show"}
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">
                                    Register
                                </button>

                                <p className="text-sm text-center text-slate-600">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => setActiveTab("login")}
                                        className="text-slate-900 font-semibold cursor-pointer">
                                        Login
                                    </span>
                                </p>
                            </form>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;
