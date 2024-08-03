import React, { useEffect, useRef } from 'react';
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
    options: VideoJsPlayerOptions;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ options }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<VideoJsPlayer | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (videoRef.current) {
                playerRef.current = videojs(videoRef.current, options);
            }
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, [options]);

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
    );
};

export default VideoPlayer;
