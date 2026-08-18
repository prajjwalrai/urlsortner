import { Link2, MousePointerClick, Copy } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ActivityFeed = ({ activities = [] }) => {
    // We will simulate recent activity using the links data since there is no separate activity endpoint
    if (!activities || activities.length === 0) {
        return (
            <div className="bg-navy-800 p-6 rounded-2xl shadow-sm border border-navy-700 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-slate-100 mb-6">Recent Activity</h3>
                <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
                    No recent activity to show.
                </div>
            </div>
        );
    }

    const getIcon = (type) => {
        switch (type) {
            case 'created': return <Link2 className="h-4 w-4 text-green-500" />;
            case 'clicked': return <MousePointerClick className="h-4 w-4 text-blue-500" />;
            case 'copied': return <Copy className="h-4 w-4 text-purple-400" />;
            default: return <Link2 className="h-4 w-4 text-slate-400" />;
        }
    };

    return (
        <div className="bg-navy-800 p-6 rounded-2xl shadow-sm border border-navy-700 h-full">
            <h3 className="text-lg font-semibold text-slate-100 mb-6">Recent Activity</h3>
            <div className="space-y-6">
                {activities.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex gap-4 group">
                        <div className="mt-1 relative">
                            <div className="bg-navy-900 p-2 rounded-full border border-navy-600 relative z-10 group-hover:scale-110 transition-transform">
                                {getIcon(activity.type)}
                            </div>
                            {index !== activities.length - 1 && index !== 4 && (
                                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-10 bg-navy-700"></div>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-200">
                                {activity.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                {activity.description}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;
