import { Link, useNavigate } from 'react-router-dom';
import { Link as LinkIcon, QrCode, ArrowRight, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Landing = () => {
    const navigate = useNavigate();
    const [longUrl, setLongUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [activeTab, setActiveTab] = useState('shorten');
    const [recentLinks, setRecentLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copiedMap, setCopiedMap] = useState({});

    useEffect(() => {
        const savedLinks = localStorage.getItem('guestRecentLinks');
        if (savedLinks) {
            try {
                setRecentLinks(JSON.parse(savedLinks));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const handleShorten = async (e) => {
        e.preventDefault();
        if (activeTab === 'qrcode') {
            navigate('/login', { state: { message: 'Please log in to generate QR codes.' } });
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/urls/public/create', {
                originalUrl: longUrl,
                customAlias: alias || undefined
            });

            const newLink = response.data.data;
            const updatedLinks = [newLink, ...recentLinks].slice(0, 3); // Keep last 3
            setRecentLinks(updatedLinks);
            localStorage.setItem('guestRecentLinks', JSON.stringify(updatedLinks));
            
            setLongUrl('');
            setAlias('');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (shortCode) => {
        const url = `${window.location.origin}/${shortCode}`;
        navigator.clipboard.writeText(url);
        setCopiedMap(prev => ({ ...prev, [shortCode]: true }));
        setTimeout(() => {
            setCopiedMap(prev => ({ ...prev, [shortCode]: false }));
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            {/* Navbar */}
            <header className="bg-[#0e526c] border-b border-[#0e526c]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="flex items-center gap-2 group">
                                <span className="text-[28px] font-black tracking-wider text-white uppercase">QuickLink</span>
                            </Link>
                            <nav className="hidden md:flex gap-6">
                                <a href="#features" className="text-[15px] font-semibold text-white/90 hover:text-white transition-colors">Features</a>
                                <a href="#resources" className="text-[15px] font-semibold text-white/90 hover:text-white transition-colors">Resources</a>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-[15px] font-semibold text-white hover:text-white/80 transition-colors mr-2">
                                Log In
                            </Link>
                            <Link
                                to="/register"
                                className="text-[15px] font-bold bg-[#1a8599] text-white px-5 py-2.5 rounded hover:bg-[#156d7d] transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center bg-[#00253f] pt-16 pb-28">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
                        
                        {/* Left Column: Hero Text */}
                        <div className="max-w-2xl pt-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.1] mb-6 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                                URL Shortener, Branded Short Links & Analytics
                            </h1>
                            <p className="text-[18px] text-white/90 mb-6 animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                                Welcome to the original link shortener — simplifying the Internet through the power of the URL since 2002.
                            </p>
                            <p className="text-[18px] text-white/90 mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                                You can use branded domains for fully custom links, track link analytics, and enjoy other powerful features.
                            </p>
                            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                                <Link
                                    to="/register"
                                    className="flex items-center justify-center gap-2 bg-[#1a8599] text-white px-8 py-3.5 rounded font-bold text-[16px] hover:bg-[#156d7d] transition-all"
                                >
                                    Create Free Account
                                </Link>
                            </div>

                            <div className="mt-14 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                                <h3 className="text-[20px] font-bold text-white mb-4">Your Recent Links:</h3>
                                
                                {recentLinks.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentLinks.map((link) => (
                                            <div key={link._id} className="bg-white rounded p-4 flex items-center justify-between shadow-sm border border-slate-200">
                                                <div className="truncate pr-4 flex-1">
                                                    <a href={`/${link.shortCode}`} target="_blank" rel="noopener noreferrer" className="text-[#1a8599] font-bold text-[15px] hover:underline block truncate">
                                                        {window.location.origin.replace(/^https?:\/\//, '')}/{link.shortCode}
                                                    </a>
                                                    <p className="text-slate-500 text-xs truncate mt-1">{link.originalUrl}</p>
                                                </div>
                                                <button 
                                                    onClick={() => copyToClipboard(link.shortCode)}
                                                    className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"
                                                    title="Copy link"
                                                >
                                                    {copiedMap[link.shortCode] ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded p-4 flex items-center gap-3 text-slate-900 text-[15px] font-bold shadow-sm border border-slate-200">
                                        <div className="bg-slate-200 text-slate-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">!</div>
                                        No links yet in your history
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Interactive Card */}
                        <div className="w-full max-w-[480px] mx-auto lg:ml-auto lg:mr-0 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                            <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200">
                                {/* Card Tabs */}
                                <div className="flex bg-[#1a8599] rounded-t-lg">
                                    <button
                                        onClick={() => setActiveTab('shorten')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-4 text-[15px] font-bold transition-colors rounded-t-lg ${
                                            activeTab === 'shorten' 
                                            ? 'text-slate-900 bg-white' 
                                            : 'text-white bg-[#1a8599] hover:bg-[#156d7d]'
                                        }`}
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        Shorten a Link
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('qrcode')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-4 text-[15px] font-bold transition-colors rounded-t-lg ${
                                            activeTab === 'qrcode' 
                                            ? 'text-slate-900 bg-white' 
                                            : 'text-white bg-[#1a8599] hover:bg-[#156d7d]'
                                        }`}
                                    >
                                        <QrCode className="w-4 h-4" />
                                        Generate QR Code
                                    </button>
                                </div>

                                {/* Card Body */}
                                <div className="p-7">
                                    <form onSubmit={handleShorten} className="space-y-6">
                                        <div>
                                            <label htmlFor="longUrl" className="block text-[14px] font-bold text-slate-900 mb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    Long URL <span className="text-red-600">*</span>
                                                </div>
                                            </label>
                                            <input
                                                type="url"
                                                id="longUrl"
                                                required
                                                placeholder="Paste long URL here"
                                                value={longUrl}
                                                onChange={(e) => setLongUrl(e.target.value)}
                                                className="w-full bg-white border border-slate-200 rounded-md px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1a8599] focus:border-[#1a8599] transition-all text-[15px] shadow-sm"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <div className="w-full">
                                                <label htmlFor="alias" className="block text-[14px] font-bold text-slate-900 mb-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><mpath d="m15 5 4 4"></mpath></svg>
                                                        Alias <span className="text-slate-500 font-normal ml-1">(optional)</span>
                                                    </div>
                                                </label>
                                                <div className="flex items-center">
                                                    <span className="bg-slate-50 border border-slate-200 border-r-0 rounded-l-md px-3 py-3 text-slate-600 font-medium text-[15px] shadow-sm">quickl.ink/</span>
                                                    <input
                                                        type="text"
                                                        id="alias"
                                                        placeholder="Add alias here"
                                                        value={alias}
                                                        onChange={(e) => setAlias(e.target.value)}
                                                        className="flex-1 w-full px-3 py-3 rounded-r-md bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1a8599] focus:border-[#1a8599] transition-all text-[15px] shadow-sm"
                                                    />
                                                </div>
                                                <p className="mt-1.5 text-[11px] text-slate-500">Must be at least 5 characters</p>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-[#2c8b4c] text-white font-bold py-3.5 px-4 rounded-md hover:bg-[#23703c] focus:outline-none transition-all shadow-sm text-[16px] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Processing...' : activeTab === 'shorten' ? 'Shorten Link' : 'Generate QR Code'}
                                        </button>

                                        {error && (
                                            <div className="mt-3 text-red-600 text-sm font-medium text-center bg-red-50 p-2 rounded">
                                                {error}
                                            </div>
                                        )}
                                        
                                        <p className="text-[12px] text-[#1a8599] italic mt-4">
                                            <span className="text-slate-600 font-medium not-italic">By clicking {activeTab === 'shorten' ? 'Shorten Link' : 'Generate QR Code'}, you agree with our </span>
                                            <a href="#" className="hover:underline">Terms of Service</a>, <a href="#" className="hover:underline">Privacy Policy</a>, and <a href="#" className="hover:underline">Use of Cookies</a>.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="bg-white py-20 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Features</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to manage your links effectively.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Link Management</h3>
                            <p className="text-slate-600">Easily create, edit, and organize all your short links in one centralized dashboard.</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Advanced Analytics</h3>
                            <p className="text-slate-600">Track clicks, geographic data, and referrers to understand your audience better.</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">QR Codes</h3>
                            <p className="text-slate-600">Instantly generate scannable QR codes for your short links for offline marketing.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Resources Section */}
            <section id="resources" className="bg-slate-50 py-20 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Resources</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">Learn how to make the most of QuickLink.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:border-[#1a8599] transition-colors cursor-pointer shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">API Documentation</h3>
                            <p className="text-slate-600">Integrate our link shortening capabilities directly into your own applications.</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-lg hover:border-[#1a8599] transition-colors cursor-pointer shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Help Center</h3>
                            <p className="text-slate-600">Find answers to frequently asked questions and step-by-step guides.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
