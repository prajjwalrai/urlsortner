import { Link2 } from 'lucide-react';

const EmptyState = ({ onAction }) => {
    return (
        <div className="bg-navy-800 rounded-2xl shadow-sm border border-navy-700 p-12 text-center flex flex-col items-center animate-fade-in">
            <div className="relative mb-6 group cursor-default">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
                <div className="bg-navy-900 border border-navy-600 p-6 rounded-3xl relative z-10 shadow-xl">
                    <Link2 className="h-12 w-12 text-blue-500" />
                </div>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">No shortened links yet</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
                Create your first short link to start tracking clicks, managing your URLs, and optimizing your reach.
            </p>
            
            <button 
                onClick={onAction}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5"
            >
                Create your first link
            </button>
        </div>
    );
};

export default EmptyState;
