import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import UrlShortener from '../components/dashboard/UrlShortener';
import UrlTable from '../components/dashboard/UrlTable';
import EmptyState from '../components/dashboard/EmptyState';
import ConfirmModal from '../components/ui/ConfirmModal';
import QrCodeModal from '../components/ui/QrCodeModal';
import { CardSkeleton } from '../components/ui/Skeleton';
import { fetchUrls, shortenUrl, deleteUrl } from '../services/api';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shortening, setShortening] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, urlId: null, shortCode: null });
    const [qrModal, setQrModal] = useState({ isOpen: false, url: '', shortCode: '' });
    
    const { addToast } = useToast();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        loadUrls();
    }, []);

    const loadUrls = async () => {
        try {
            setLoading(true);
            const data = await fetchUrls();
            setUrls(data || []);
        } catch (error) {
            console.error('Error fetching URLs:', error);
            addToast({ type: 'error', message: 'Failed to load your links.' });
        } finally {
            setLoading(false);
        }
    };

    const handleShorten = async (originalUrl) => {
        setShortening(true);
        try {
            const data = await shortenUrl(originalUrl);
            setUrls([data, ...urls]);
            addToast({ type: 'success', message: 'Link successfully shortened!' });
            return { success: true, data };
        } catch (error) {
            console.error('Error shortening URL:', error);
            addToast({ type: 'error', message: error.response?.data?.message || 'Failed to shorten URL' });
            throw error;
        } finally {
            setShortening(false);
        }
    };

    const confirmDelete = (id, shortCode) => {
        setDeleteModal({ isOpen: true, urlId: id, shortCode });
    };

    const handleDelete = async () => {
        try {
            await deleteUrl(deleteModal.urlId);
            setUrls(urls.filter(url => url._id !== deleteModal.urlId));
            addToast({ type: 'success', message: 'Link deleted successfully' });
        } catch (error) {
            console.error('Error deleting URL:', error);
            addToast({ type: 'error', message: 'Failed to delete link' });
        } finally {
            setDeleteModal({ isOpen: false, urlId: null, shortCode: null });
        }
    };

    const handleCopy = (shortCode) => {
        navigator.clipboard.writeText(`${API_URL}/${shortCode}`);
        addToast({ type: 'success', message: 'Copied to clipboard ✓' });
    };

    const showQrCode = (url) => {
        // url is the full short URL here, e.g., http://localhost:5000/CO_-xTd
        // Extract shortCode from the end of the URL to pass it down
        const shortCode = url.split('/').pop();
        setQrModal({ isOpen: true, url, shortCode });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1727] relative overflow-hidden">
            {/* Cool Animated Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
            
            <Navbar />

            <main className="flex-1 w-full mx-auto pb-16 sm:pb-20 lg:pb-24 relative z-10">
                
                {/* Main Content Workspace */}
                <div className="animate-slide-up space-y-12 sm:space-y-16" style={{ animationDelay: '100ms' }}>
                    
                    {/* The Premium White Shortener Workspace */}
                    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-20">
                        <UrlShortener onShorten={handleShorten} isLoading={shortening} apiUrl={API_URL} />
                    </div>
                    
                    {/* Your Links Section */}
                    <div className="max-w-5xl mx-auto w-full pt-4">
                        {!loading && urls.length === 0 && !searchQuery ? (
                            <EmptyState onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
                        ) : (
                            <UrlTable 
                                urls={urls} 
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                isLoading={loading}
                                apiUrl={API_URL}
                                onCopy={handleCopy}
                                onDelete={confirmDelete}
                                onShowQr={showQrCode}
                            />
                        )}
                    </div>
                </div>
            </main>

            <ConfirmModal 
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, urlId: null, shortCode: null })}
                onConfirm={handleDelete}
                title="Delete Link"
                message={`Are you sure you want to delete quicklink/${deleteModal.shortCode}? This action cannot be undone and will break any existing references to this short link.`}
                confirmText="Delete Link"
                cancelText="Cancel"
            />

            <QrCodeModal 
                isOpen={qrModal.isOpen}
                onClose={() => setQrModal({ isOpen: false, url: '', shortCode: '' })}
                url={qrModal.url}
                shortCode={qrModal.shortCode}
            />
        </div>
    );
};

export default Dashboard;
