import { Copy, Trash2, QrCode, ExternalLink, MoreVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../../utils';

const UrlRow = ({ url, apiUrl, onCopy, onDelete, onShowQr }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const fullShortUrl = `${apiUrl}/${url.shortCode}`;
    const isActive = true;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="grid grid-cols-[2.5fr_1fr_1fr_0.8fr_0.5fr] gap-4 px-4 py-4 hover:bg-white/5 transition-colors items-center group">
            
            {/* Link Details */}
            <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-slate-200 text-[14px]">quicklink/{url.shortCode}</span>
                    <button 
                        onClick={() => onCopy(url.shortCode)}
                        className="text-slate-500 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
                        title="Copy short link"
                    >
                        <Copy className="h-3.5 w-3.5" />
                    </button>
                </div>
                <div 
                    className="text-[13px] text-slate-500 truncate"
                    title={url.originalUrl}
                >
                    {url.originalUrl}
                </div>
            </div>
            
            {/* Clicks */}
            <div className="text-[14px] text-slate-300 font-medium">
                {url.clicks.toLocaleString()} <span className="text-[13px] text-slate-500 font-normal">clicks</span>
            </div>

            {/* Created */}
            <div className="text-[14px] text-slate-400">
                {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
            </div>

            {/* Status */}
            <div>
                <span className={cn(
                    "inline-flex items-center gap-1.5 text-[13px] font-medium",
                    isActive ? "text-slate-300" : "text-slate-500"
                )}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", isActive ? "bg-green-500" : "bg-slate-600")}></span>
                    {isActive ? 'Active' : 'Inactive'}
                </span>
            </div>

            {/* Actions */}
            <div className="relative text-right" ref={menuRef}>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={cn(
                        "p-1.5 text-slate-400 hover:text-slate-200 transition-colors rounded-md hover:bg-navy-700",
                        isMenuOpen && "bg-navy-700 text-slate-200"
                    )}
                >
                    <MoreVertical className="h-4 w-4" />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 top-8 w-40 bg-navy-800 rounded-lg shadow-xl border border-navy-700 py-1 z-20 animate-fade-in origin-top-right">
                        <button 
                            onClick={() => { onCopy(url.shortCode); setIsMenuOpen(false); }}
                            className="w-full text-left px-3 py-1.5 text-[13px] text-slate-300 hover:bg-navy-700/50 flex items-center gap-2"
                        >
                            <Copy className="h-3.5 w-3.5" /> Copy Link
                        </button>
                        <a 
                            href={fullShortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full text-left px-3 py-1.5 text-[13px] text-slate-300 hover:bg-navy-700/50 flex items-center gap-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <ExternalLink className="h-3.5 w-3.5" /> Open Link
                        </a>
                        <button 
                            onClick={() => { onShowQr(fullShortUrl); setIsMenuOpen(false); }}
                            className="w-full text-left px-3 py-1.5 text-[13px] text-slate-300 hover:bg-navy-700/50 flex items-center gap-2"
                        >
                            <QrCode className="h-3.5 w-3.5" /> QR Code
                        </button>
                        <div className="h-px bg-navy-700/50 my-1"></div>
                        <button 
                            onClick={() => { onDelete(url._id, url.shortCode); setIsMenuOpen(false); }}
                            className="w-full text-left px-3 py-1.5 text-[13px] text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                        >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UrlRow;
