declare module 'video.js' {
    export interface VideoJsPlayerOptions {
        controls?: boolean;
        autoplay?: boolean;
        preload?: string;
        width?: number;
        height?: number;
        fluid?: boolean;
        sources?: {
            src: string;
            type: string;
        }[];
    }

    export interface VideoJsPlayer {
        play(): void;
        pause(): void;
        dispose(): void;
        // 필요한 메서드와 속성을 추가합니다.
    }

    export default function videojs(
        element: HTMLVideoElement,
        options?: VideoJsPlayerOptions
    ): VideoJsPlayer;
}
