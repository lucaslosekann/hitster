import { Play, Pause, SkipForward, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameControlsProps {
    isPlaying: boolean;
    yearRevealed: boolean;
    onPlayPause: () => void;
    onReveal: () => void;
    onNext: () => void;
}

const GameControls = ({ isPlaying, yearRevealed, onPlayPause, onReveal, onNext }: GameControlsProps) => {
    return (
        <div className="flex flex-col items-center gap-6 w-full px-8">
            {/* Play/Pause - Main button */}
            <button
                onClick={onPlayPause}
                className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95",
                    "bg-primary text-primary-foreground shadow-neon",
                    isPlaying && "glow-pulse",
                )}
            >
                {isPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                )}
            </button>

            {/* Secondary controls */}
            <div className="flex items-center justify-center gap-4 w-full">
                {/* Reveal Year Button */}
                <button
                    onClick={onReveal}
                    disabled={yearRevealed}
                    className={cn(
                        "flex-1 max-w-40 h-14 rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95",
                        "font-medium text-sm",
                        yearRevealed
                            ? "bg-accent text-accent-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    )}
                >
                    <Eye className="w-5 h-5" />
                    {yearRevealed ? "Revealed!" : "Reveal Year"}
                </button>

                {/* Next Song Button */}
                <button
                    onClick={onNext}
                    className={cn(
                        "flex-1 max-w-40 h-14 rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95",
                        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                        "font-medium text-sm",
                    )}
                >
                    <SkipForward className="w-5 h-5" />
                    Next
                </button>
            </div>
        </div>
    );
};

export default GameControls;
