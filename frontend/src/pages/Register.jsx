import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link as LinkIcon } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 hover:-translate-y-[2px] transition-transform duration-300">
                <div className="text-center">
                    <LinkIcon className="mx-auto h-12 w-12 text-blue-500" />
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-100">Create an account</h2>
                </div>
                {error && <div className="bg-red-900/20 text-red-400 p-3 rounded-lg text-center text-sm border border-red-900/50">{error}</div>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label className="sr-only" htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="relative block w-full rounded-lg border border-slate-600 bg-slate-900/50 py-3 px-4 text-slate-100 placeholder-slate-500 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all sm:text-sm"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="email-address">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full rounded-lg border border-slate-600 bg-slate-900/50 py-3 px-4 text-slate-100 placeholder-slate-500 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all sm:text-sm mt-4"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full rounded-lg border border-slate-600 bg-slate-900/50 py-3 px-4 text-slate-100 placeholder-slate-500 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all sm:text-sm mt-4"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 shadow-sm shadow-blue-900/20 hover:shadow-blue-900/40"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-500 hover:text-blue-400 transition-colors">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
