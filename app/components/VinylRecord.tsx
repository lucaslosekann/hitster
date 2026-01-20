import { cn } from "@/lib/utils";

interface VinylRecordProps {
    isPlaying: boolean;
}

const VinylRecord = ({ isPlaying }: VinylRecordProps) => {
    return (
        <div className="relative flex items-center justify-center">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,hsl(15_100%_60%/0.15)_0%,transparent_70%)] blur-3xl" />

            {/* Vinyl record */}
            <div
                className={cn(
                    "relative w-64 h-64 rounded-full shadow-vinyl transition-all duration-300",
                    isPlaying ? "vinyl-spin" : "vinyl-spin vinyl-spin-paused",
                )}
            >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-zinc-800 via-zinc-900 to-black" />

                {/* Grooves */}
                <div className="absolute inset-3 rounded-full border border-zinc-700/30" />
                <div className="absolute inset-6 rounded-full border border-zinc-700/20" />
                <div className="absolute inset-9 rounded-full border border-zinc-700/30" />
                <div className="absolute inset-12 rounded-full border border-zinc-700/20" />
                <div className="absolute inset-15 rounded-full border border-zinc-700/30" />
                <div className="absolute inset-18 rounded-full border border-zinc-700/20" />

                {/* Label center */}
                <div className="absolute inset-22 rounded-full bg-linear-to-br from-primary/90 to-primary shadow-inner flex items-center justify-center"></div>

                {/* Center hole */}
                <div className="absolute inset-30 rounded-full bg-zinc-700" />

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-full bg-linear-to-tr from-transparent via-white/5 to-transparent" />
            </div>
        </div>
    );
};

export default VinylRecord;
