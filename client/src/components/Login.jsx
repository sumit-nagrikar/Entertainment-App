import { useState } from 'react';
import axios from "axios";
import { API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../redux/userSlice';
import { MdMovieCreation } from "react-icons/md";

const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoadingState] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getInputData = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true)); // Set global loading state
        setLoadingState(true);

        if (isLogin) {
            const user = { email, password };
            try {
                const res = await axios.post(`${API_END_POINT}/login`, user, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                    localStorage.setItem('token', res.data.token);
                    dispatch(setUser(res.data.user));
                    onLogin();
                    navigate('/home');
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An unexpected error occurred.");
                }
                console.log(error);
            } finally {
                setLoadingState(false);
                dispatch(setLoading(false)); // Reset global loading state
            }
        } else {
            const user = { fullName, email, password };
            try {
                const res = await axios.post(`${API_END_POINT}/register`, user, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                    setIsLogin(true);
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("An unexpected error occurred.");
                }
                console.log(error);
            } finally {
                setLoadingState(false);
                dispatch(setLoading(false));
            }
        }

        setFullName("");
        setEmail("");
        setPassword("");
    }

    const toggleLoginMode = () => {
        setIsLogin(!isLogin);
    }

    return (
        <div className="min-h-available bg-[#10141E] flex items-center justify-center">
            <div className="absolute top-0 left-0 right-0 flex justify-center mt-8">
                <div className="w-12 h-12 mr-10 flex items-center justify-center">
                    <MdMovieCreation className="text-red-600 mx-auto" size={35}/>
                </div>
            </div>

            <div className="bg-[#1E2535] p-8 mt-8 rounded-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">{isLogin ? "Login" : "Signup"}</h2>
                <form onSubmit={getInputData}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-gray-400 mb-2" htmlFor="fullName">Fullname</label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-3 py-2 bg-[#10141E] text-white border border-gray-700 rounded focus:outline-none focus:border-red-500"
                                autoComplete='username'
                                required
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-[#10141E] text-white border border-gray-700 rounded focus:outline-none focus:border-red-500"
                            autoComplete='email'
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-[#10141E] text-white border border-gray-700 rounded focus:outline-none focus:border-red-500"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-100 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : (isLogin ? "Login" : "Signup")}
                    </button>
                </form>
                <p className="text-center text-gray-400 mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={toggleLoginMode} className="text-red-500 hover:underline cursor-pointer ml-1">
                        {isLogin ? "Signup" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
