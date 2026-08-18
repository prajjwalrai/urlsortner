import { Search, Filter } from 'lucide-react';
import UrlRow from './UrlRow';
import { TableSkeleton } from '../ui/Skeleton';

const UrlTable = ({ urls, searchQuery, onSearchChange, isLoading, apiUrl, onCopy, onDelete, onShowQr }) => {
    return (
        <div className="flex flex-col">
            {/* Header Area */}
            <div className="py-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-[20px] font-semibold text-white">Your Links</h2>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-[280px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search links..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full h-[42px] pl-10 pr-4 rounded-lg border border-white/10 bg-[#0b1727] focus:bg-white/5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-100 placeholder-slate-500 transition-all outline-none text-[15px]"
                        />
                    </div>
                    <button className="h-[42px] w-[42px] flex items-center justify-center bg-[#0b1727] border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hidden sm:flex" title="Filter links">
                        <Filter className="h-4 w-4" />
                    </button>
                </div>
            </div>
            
            <div className="w-full overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* Strict Grid Header */}
                    <div className="grid grid-cols-[2.5fr_1fr_1fr_0.8fr_0.5fr] gap-4 px-4 py-4 border-b border-white/5 text-[13px] font-semibold text-slate-500 uppercase tracking-wider items-center">
                        <div>Link</div>
                        <div>Clicks</div>
                        <div>Created</div>
                        <div>Status</div>
                        <div className="text-right">Actions</div>
                    </div>

                    <div className="divide-y divide-white/5">
                        {isLoading ? (
                            <div className="py-6"><TableSkeleton /></div>
                        ) : urls.length > 0 ? (
                            urls.map((url) => (
                                <UrlRow 
                                    key={url._id} 
                                    url={url} 
                                    apiUrl={apiUrl} 
                                    onCopy={onCopy} 
                                    onDelete={onDelete} 
                                    onShowQr={onShowQr} 
                                />
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-[15px] text-slate-400 font-medium">
                                    {searchQuery ? "No matching links found." : "No shortened links yet. Create your first link above."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlTable;
