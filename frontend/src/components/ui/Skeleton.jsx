import { cn } from '../../utils';

export const Skeleton = ({ className }) => {
    return (
        <div className={cn("animate-pulse bg-navy-700/50 rounded-md", className)} />
    );
};

export const TableSkeleton = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 py-3 px-4 border-b border-navy-700/50">
                        <Skeleton className="h-4 w-1/3 rounded-lg" />
                        <Skeleton className="h-4 w-1/4 rounded-lg" />
                        <Skeleton className="h-4 w-16 rounded-lg ml-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export const CardSkeleton = () => {
    return (
        <div className="bg-navy-800 p-6 rounded-2xl shadow-sm border border-navy-700 flex items-center justify-between">
            <div className="space-y-3 w-1/2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-2/3" />
            </div>
            <Skeleton className="h-12 w-12 rounded-xl" />
        </div>
    );
};
