"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import VinylRecord from "./VinylRecord";
import GameControls from "./GameControls";
import { Music2 } from "lucide-react";

type Track = {
    name: string;
    artist: string;
    release_date: string;
    preview_url: string;
};

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSongInfo, setShowSongInfo] = useState(false);
    const [track, setTrack] = useState<Track | null>(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [tracks, setTracks] = useState<Track[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    async function loadTracks() {
        setIsLoading(true);
        const res = await fetch("/api/spotify");
        const data = await res.json();
        setTracks(data);
        setTrack(data[0]);
        setIsLoading(false);
    }

    const loadTrack = useCallback(() => {
        if (!tracks) return;
        const nextIndex = (currentSongIndex + 1) % tracks.length;
        setCurrentSongIndex(nextIndex);
        setTrack(tracks[nextIndex]);
    }, [currentSongIndex, tracks]);

    const handlePlayPause = useCallback(() => {
        setIsPlaying((prev) => !prev);
    }, []);

    const handleReveal = useCallback(() => {
        setShowSongInfo(true);
    }, []);

    const handleNext = useCallback(() => {
        if (currentSongIndex === tracks!.length - 1) {
            // If it's the last track, game is over
            alert("You've reached the end of the playlist! Thanks for playing!");
            return;
        }
        setIsPlaying(false);
        setShowSongInfo(false);
        loadTrack();

        // Auto-play next song after a short delay
        setTimeout(() => {
            setIsPlaying(true);
        }, 500);
    }, [loadTrack, currentSongIndex, tracks]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTracks();
    }, []);

    useEffect(() => {
        const preview_url = track?.preview_url;
        if (!preview_url) return;
        if (!audioRef.current) {
            audioRef.current = new Audio(preview_url);
        } else {
            audioRef.current.src = preview_url;
        }
        return () => {
            setIsPlaying(false);
        };
    }, [track?.preview_url]);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen py-6 px-4 relative">
            {/* Header */}
            <div className="flex items-center gap-3 slide-up">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Music2 className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-2xl font-display font-bold tracking-tight">Hitster</h1>
            </div>

            {/* Song counter */}
            <div className="text-muted-foreground text-sm font-medium pt-2">
                Song {currentSongIndex + 1} of {tracks?.length}
            </div>

            {/* Vinyl Record */}
            <div className="flex-1 flex items-center justify-center pt-4">
                <VinylRecord isPlaying={isPlaying} />
            </div>
            <div className="pt-4 flex items-center justify-center">
                {showSongInfo && (
                    <div className="text-center bounce-in">
                        <p className="font-display font-bold text-2xl text-foreground">
                            {track?.release_date.split("-")[0]}
                        </p>
                    </div>
                )}
            </div>

            <div className="py-6 flex items-center justify-center">
                {showSongInfo && (
                    <div className="text-center bounce-in">
                        <p className="font-display font-semibold text-foreground">{track?.name}</p>
                        <p className="text-sm text-muted-foreground">{track?.artist}</p>
                    </div>
                )}
            </div>

            {/* Controls */}
            <GameControls
                isPlaying={isPlaying}
                yearRevealed={!!showSongInfo}
                onPlayPause={handlePlayPause}
                onReveal={handleReveal}
                onNext={handleNext}
            />
            {isLoading && <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>}
        </div>
    );
}
