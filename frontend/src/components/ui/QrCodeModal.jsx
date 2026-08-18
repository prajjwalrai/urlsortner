import { X, Download, QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

const QrCodeModal = ({ isOpen, onClose, url, shortCode }) => {
    const qrRef = useRef(null);

    if (!isOpen || !url) return null;

    const downloadQrCode = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (!canvas) return;
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `qr-${shortCode || 'link'}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="fixed inset-0 bg-[#0b1727]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-[#112240] p-6 rounded-2xl shadow-2xl max-w-sm w-full border border-slate-700 transform animate-slide-up flex flex-col items-center" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex w-full justify-between items-start mb-4">
                    <div className="bg-orange-500/10 p-3 rounded-full border border-orange-500/20">
                        <QrCode className="h-6 w-6 text-orange-500" />
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white text-center">QR Code</h3>
                <p className="text-sm text-slate-400 mb-6 text-center truncate w-full px-4">
                    {url}
                </p>
                
                <div className="bg-white p-4 rounded-xl mb-6 flex justify-center items-center shadow-inner" ref={qrRef}>
                    <QRCodeCanvas 
                        value={url} 
                        size={200}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"H"}
                        includeMargin={false}
                    />
                </div>
                
                <button 
                    onClick={downloadQrCode}
                    className="w-full bg-[#0052CC] text-white font-bold py-3 rounded-xl hover:bg-[#0047b3] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                    <Download className="h-5 w-5" />
                    Download QR Code
                </button>
            </div>
        </div>
    );
};

export default QrCodeModal;
