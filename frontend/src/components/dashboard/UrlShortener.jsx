import { useState, useRef } from 'react';
import { Link2, Copy, Check, QrCode, ArrowRight, Download } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { cn } from '../../utils';
import { useToast } from '../../context/ToastContext';

const UrlShortener = ({ onShorten, isLoading, apiUrl }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [successData, setSuccessData] = useState(null);
    const [activeTab, setActiveTab] = useState('shorten'); // 'shorten' | 'qr'
    const [qrUrl, setQrUrl] = useState('');
    const [showQr, setShowQr] = useState(false);
    const qrRef = useRef(null);
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!originalUrl.trim()) return;
        
        try {
            const result = await onShorten(originalUrl);
            if (result.success) {
                setOriginalUrl('');
                setSuccessData({
                    originalUrl: result.data.originalUrl,
                    shortCode: result.data.shortCode
                });
            }
        } catch (err) {}
    };

    const handleCopy = () => {
        if (!successData) return;
        navigator.clipboard.writeText(`${apiUrl}/${successData.shortCode}`);
        addToast({ type: 'success', message: 'Copied to clipboard ✓' });
    };

    const handleGenerateQr = (e) => {
        e.preventDefault();
        if (!qrUrl.trim()) return;
        setShowQr(true);
    };

    const downloadQrCode = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (!canvas) return;
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `qr-code.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Tabs container - positioned centrally to match screenshot */}
            <div className="flex z-10 w-full justify-center lg:justify-start lg:ml-[10%] xl:ml-[15%]">
                <button 
                    onClick={() => setActiveTab('shorten')}
                    className={cn(
                        "px-8 py-4 text-[18px] font-bold rounded-t-[20px] transition-colors flex items-center gap-2",
                        activeTab === 'shorten' ? "bg-white text-gray-900" : "bg-transparent text-white border border-white hover:bg-white/10 ml-2"
                    )}
                >
                    <Link2 className={cn("h-6 w-6", activeTab === 'shorten' ? "text-orange-500" : "text-white")} /> Short Link
                </button>
                <button 
                    onClick={() => setActiveTab('qr')}
                    className={cn(
                        "px-8 py-4 text-[18px] font-bold rounded-[12px] transition-colors flex items-center gap-2 ml-4 my-1 border border-slate-600",
                        activeTab === 'qr' ? "bg-white text-gray-900" : "bg-[#0b1727] text-white hover:bg-white/10"
                    )}
                >
                    <QrCode className="h-6 w-6 text-orange-500" /> QR Code
                </button>
            </div>

            {/* Main Premium White Workspace */}
            <div className="bg-white rounded-[32px] w-full p-8 sm:p-12 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative -mt-1 z-20 overflow-hidden">
                {/* Subtle decorative glow inside the card */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
                
                <div className="mb-8 relative z-10">
                    <h2 className="text-[36px] sm:text-[42px] font-extrabold text-gray-900 tracking-tight leading-tight">
                        {activeTab === 'shorten' ? 'Shorten a long link' : 'Generate QR Code'}
                    </h2>
                    <p className="text-gray-500 mt-2 text-[18px] font-medium flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        {activeTab === 'shorten' 
                            ? 'Lightning fast. Always free. No strings attached.'
                            : 'Create downloadable QR codes for any link instantly.'}
                    </p>
                </div>

                {activeTab === 'shorten' ? (
                    !successData ? (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-[18px] font-extrabold text-gray-900 mb-2">
                                    Paste your long link here
                                </label>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://example.com/my-long-url"
                                    value={originalUrl}
                                    onChange={(e) => setOriginalUrl(e.target.value)}
                                    className="w-full h-[64px] px-6 rounded-xl border border-gray-300 bg-white focus:ring-0 focus:border-blue-600 text-gray-900 placeholder-gray-400 transition-colors outline-none text-[18px] font-medium shadow-sm hover:border-gray-400"
                                />
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading || !originalUrl.trim()}
                                    className="h-[64px] px-8 bg-gradient-to-r from-[#0052CC] to-[#003d99] hover:from-[#0047b3] hover:to-[#002e7a] text-white font-bold text-[20px] rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-200"
                                >
                                    {isLoading ? (
                                        <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>Shorten it now <ArrowRight className="h-6 w-6" /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-white border-2 border-green-500/20 rounded-xl p-8 animate-fade-in shadow-sm mt-4 relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-green-100 text-green-700 p-1.5 rounded-full"><Check className="h-5 w-5" /></span>
                                        <span className="text-[28px] font-extrabold text-gray-900 truncate">
                                            {apiUrl.replace(/^https?:\/\//, '')}/{successData.shortCode}
                                        </span>
                                    </div>
                                    <p className="text-[16px] text-gray-500 truncate" title={successData.originalUrl}>
                                        {successData.originalUrl}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <button 
                                        onClick={handleCopy}
                                        className="w-full sm:w-auto px-10 py-4 bg-[#0052CC] hover:bg-[#0047b3] text-white font-bold text-[18px] rounded-xl transition-colors shadow-md"
                                    >
                                        Copy Link
                                    </button>
                                    <button onClick={() => setSuccessData(null)} className="w-full sm:w-auto px-6 py-4 text-[16px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
                                        Shorten another
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="relative z-10">
                        {!showQr ? (
                            <form onSubmit={handleGenerateQr} className="space-y-6">
                                <div>
                                    <label className="block text-[18px] font-extrabold text-gray-900 mb-2">
                                        Enter link to generate QR Code
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        placeholder="https://example.com"
                                        value={qrUrl}
                                        onChange={(e) => setQrUrl(e.target.value)}
                                        className="w-full h-[64px] px-6 rounded-xl border border-gray-300 bg-white focus:ring-0 focus:border-blue-600 text-gray-900 placeholder-gray-400 transition-colors outline-none text-[18px] font-medium shadow-sm hover:border-gray-400"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                                    <button
                                        type="submit"
                                        disabled={!qrUrl.trim()}
                                        className="h-[64px] px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-[20px] rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-200"
                                    >
                                        Generate QR Code <QrCode className="h-6 w-6" />
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 bg-gray-50 p-8 rounded-2xl border border-gray-200">
                                <div className="bg-white p-4 rounded-xl shadow-md" ref={qrRef}>
                                    <QRCodeCanvas 
                                        value={qrUrl} 
                                        size={220}
                                        bgColor={"#ffffff"}
                                        fgColor={"#000000"}
                                        level={"H"}
                                        includeMargin={false}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <h3 className="text-[24px] font-bold text-gray-900 mb-2">Your QR Code is ready</h3>
                                    <p className="text-gray-500 mb-6 truncate" title={qrUrl}>{qrUrl}</p>
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <button 
                                            onClick={downloadQrCode}
                                            className="w-full sm:w-auto px-8 py-4 bg-[#0052CC] hover:bg-[#0047b3] text-white font-bold text-[18px] rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                                        >
                                            <Download className="h-5 w-5" /> Download PNG
                                        </button>
                                        <button 
                                            onClick={() => { setShowQr(false); setQrUrl(''); }}
                                            className="w-full sm:w-auto px-6 py-4 text-[16px] font-bold text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            Generate another
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UrlShortener;
