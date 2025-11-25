import "@/app/globals.css";

export default function SkeletonCard() {
    return (
        <div className="animate-pulse">
            <div className="w-full h-[300px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-300 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
            <div className="h-4 m-auto bg-gray-300 mt-4 w-1/2 rounded-md"></div>
        </div>
    );
}