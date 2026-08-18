import { Link as LinkIcon, LogOut, Menu } from 'lucide-react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white sticky top-0 z-40 border-b border-gray-100">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-[72px] items-center">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-2.5 cursor-pointer">
                        <LinkIcon className="h-7 w-7 text-blue-600" strokeWidth={2.5} />
                        <span className="font-extrabold text-[24px] text-gray-900 tracking-tight">QuickLink</span>
                    </div>

                    {/* Center: Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <span className="text-gray-900 font-semibold text-[15px] cursor-pointer hover:text-blue-600 transition-colors">Platform</span>
                        <span className="text-gray-900 font-semibold text-[15px] cursor-pointer hover:text-blue-600 transition-colors">Solutions</span>
                        <span className="text-gray-900 font-semibold text-[15px] cursor-pointer hover:text-blue-600 transition-colors">Pricing</span>
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <span className="text-gray-900 font-semibold text-[15px] cursor-pointer hover:text-blue-600 transition-colors mr-2">Log in</span>
                        <button className="px-5 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-[15px] rounded-lg transition-colors">
                            Get a Quote
                        </button>
                        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[15px] rounded-lg transition-colors shadow-sm">
                            Sign up Free
                        </button>
                        <button onClick={logout} className="ml-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Logout">
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 p-2"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-4 py-3 space-y-1">
                        <a href="#dashboard" className="block px-3 py-2 rounded-md text-base font-semibold text-gray-900 bg-gray-50">Platform</a>
                        <a href="#solutions" className="block px-3 py-2 rounded-md text-base font-semibold text-gray-900 hover:bg-gray-50">Solutions</a>
                        <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-semibold text-gray-900 hover:bg-gray-50">Pricing</a>
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-100">
                        <div className="flex items-center px-5 gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-col">
                                <div className="text-sm font-bold text-gray-900">{user?.name || 'User'}</div>
                                <div className="text-xs text-gray-500">Free Plan</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            <button onClick={logout} className="flex w-full items-center px-3 py-2 rounded-md text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                                <LogOut className="h-4 w-4 mr-3" />
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
