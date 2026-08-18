import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link as LinkIcon, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex min-h-screen bg-white font-sans overflow-hidden">
            {/* Left side - Register Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 relative overflow-y-auto">
                {/* Logo top left */}
                <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-[28px] font-black tracking-wider text-[#1a8599] uppercase">QuickLink</span>
                    </Link>
                </div>

                <div className="w-full max-w-md mt-20 lg:mt-0">
                    <div className="text-left mb-8">
                        <h2 className="text-[36px] font-extrabold text-slate-900 mb-2">Sign Up</h2>
                        <p className="text-[15px] text-slate-700">
                            Already a user?{' '}
                            <Link to="/login" className="font-bold text-[#1a8599] hover:underline">Log In</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100 mb-6 font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-[14px] font-bold text-slate-900 mb-2" htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-full rounded-md border border-slate-300 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1a8599] focus:border-[#1a8599] transition-all text-[15px] shadow-sm"
                                placeholder="Enter Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-[14px] font-bold text-slate-900 mb-2" htmlFor="email-address">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-md border border-slate-300 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1a8599] focus:border-[#1a8599] transition-all text-[15px] shadow-sm"
                                placeholder="Enter Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-[14px] font-bold text-slate-900 mb-2" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full rounded-md border border-slate-300 bg-white py-3 pl-4 pr-12 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1a8599] focus:border-[#1a8599] transition-all text-[15px] shadow-sm"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            
                            {/* Dummy Security Meter */}
                            <div className="flex items-center gap-3 mt-3">
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${password.length > 8 ? 'bg-emerald-500 w-full' : password.length > 5 ? 'bg-amber-400 w-2/3' : password.length > 0 ? 'bg-red-500 w-1/3' : 'bg-transparent'}`}></div>
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium shrink-0 flex items-center gap-1">
                                    Security <span className="flex items-center justify-center w-3 h-3 bg-slate-400 text-white rounded-full text-[8px] font-bold">i</span>
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 mb-6">
                            <p className="text-[12px] text-slate-700">
                                By Signing Up, you agree to our <a href="#" className="text-[#1a8599] hover:underline">Terms of Service</a>, <a href="#" className="text-[#1a8599] hover:underline">Privacy Policy</a>, and <a href="#" className="text-[#1a8599] hover:underline">Use of Cookies</a>.
                            </p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full justify-center rounded-md bg-[#6e7276] px-4 py-3.5 text-[16px] font-bold text-white hover:bg-[#5a5e62] focus:outline-none transition-all duration-200 shadow-sm"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right side - Hero / Animation */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#015b7e] relative items-center justify-center p-12 overflow-hidden">
                {/* Decorative floating elements */}
                <div className="absolute inset-0 w-full h-full">
                    {/* Glowing orbs */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#1a8599] rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#0ea5e9] rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#0369a1] rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
                    
                    {/* Geometric web elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-spin-slow text-white">
                            <path fill="currentColor" d="M42.7,-62.4C50.9,-52.8,49.8,-32.6,53.8,-15.8C57.7,1,66.8,14.5,65.8,26.8C64.8,39,53.7,50,40.4,55.8C27.1,61.7,11.5,62.3,-4.2,67.3C-19.8,72.3,-35.6,81.6,-48.9,76.5C-62.2,71.3,-72.9,51.6,-77.3,31.7C-81.7,11.8,-79.8,-8.3,-71.4,-24.1C-63,-39.9,-48.1,-51.4,-33.5,-59.6C-18.9,-67.8,-4.6,-72.7,8.2,-68.8C21,-64.9,34.5,-72,42.7,-62.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center mt-32">
                    <div className="w-64 h-48 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-6 mb-12 transform hover:scale-105 transition-transform duration-500">
                        <div className="flex gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#1a8599] rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0ms' }}>
                                <LinkIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '200ms' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '400ms' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            </div>
                        </div>
                        <div className="w-full h-10 bg-white rounded-md flex items-center px-4 shadow-inner">
                            <span className="text-slate-500 font-mono font-medium">www.</span>
                            <span className="w-2 h-4 bg-slate-800 ml-1 animate-pulse"></span>
                        </div>
                    </div>
                    
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                        <h1 className="text-white text-3xl font-bold tracking-wide">Join QuickLink Today!</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
