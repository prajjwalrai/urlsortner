import { cn } from '../../utils';

const StatCard = ({ title, value, subtitle, icon: Icon }) => {
    return (
        <div className="bg-navy-800/80 p-5 rounded-xl border border-navy-700/50 hover:border-navy-600 transition-colors flex flex-col justify-between h-[130px]">
            <div className="flex items-center justify-between">
                <h3 className="text-slate-400 text-[13px] font-medium flex items-center gap-2">
                    {title}
                </h3>
                <Icon className="h-4 w-4 text-slate-500" strokeWidth={2} />
            </div>
            
            <div className="mt-auto">
                <p className="text-[32px] font-semibold text-slate-100 tracking-tight leading-none mb-1">
                    {value}
                </p>
                {subtitle && (
                    <p className="text-[13px] text-slate-500">{subtitle}</p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
