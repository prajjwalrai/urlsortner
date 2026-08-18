import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-navy-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-navy-700 transform animate-slide-up" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-red-500/10 p-3 rounded-full border border-red-500/20">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-slate-100">{title}</h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    {message}
                </p>
                
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={onClose}
                        className="flex-1 bg-navy-700 text-slate-300 font-medium py-2.5 rounded-lg hover:bg-navy-600 transition-colors border border-navy-600"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="flex-1 bg-red-600/90 text-white font-medium py-2.5 rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-900/20"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
