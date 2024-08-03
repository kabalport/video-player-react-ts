import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { lightTheme, darkTheme } from './theme';
import {
    GlobalStyle,
    AppBar,
    AppBarTitle,
    StyledContainer,
    PlayerWrapper,
    PlayerControlsWrapper,
    PlayerControls,
    ControlButton,
    Playlist,
    PlaylistItem,
    SearchBar,
    SearchInput,
    TimeDisplay,
    FavoriteButton,
    FavoriteList,
    FavoriteItem
} from './styles';
import {ThemeProvider} from "styled-components";

interface Video {
    url: string;
    title: string;
}

const videos: Video[] = [
    { url: 'https://www.youtube.com/watch?v=szj8w-5nqE4', title: 'Video 1' },
    { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Video 2' },
    { url: 'https://www.youtube.com/watch?v=3tmd-ClpJxA', title: 'Video 3' },
];

const App: React.FC = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videoList, setVideoList] = useState<Video[]>(videos);
    const [url, setUrl] = useState('');
    const [playing, setPlaying] = useState(true);
    const [loop, setLoop] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [theme, setTheme] = useState(lightTheme);
    const [favoriteVideos, setFavoriteVideos] = useState<Video[]>([]);
    const playerRef = useRef<ReactPlayer>(null);

    useEffect(() => {
        const savedVolume = localStorage.getItem('volume');
        if (savedVolume) {
            setVolume(parseFloat(savedVolume));
        }
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
        }
        const savedFavorites: Video[] = JSON.parse(localStorage.getItem('favoriteVideos') || '[]');
        setFavoriteVideos(savedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem('volume', volume.toString());
    }, [volume]);

    useEffect(() => {
        localStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('favoriteVideos', JSON.stringify(favoriteVideos));
    }, [favoriteVideos]);

    const handleNext = () => {
        if (shuffle) {
            setCurrentVideoIndex(Math.floor(Math.random() * videoList.length));
        } else {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoList.length);
        }
    };

    const handlePrevious = () => {
        if (shuffle) {
            setCurrentVideoIndex(Math.floor(Math.random() * videoList.length));
        } else {
            setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoList.length) % videoList.length);
        }
    };

    const handleVideoSelect = (index: number) => {
        setCurrentVideoIndex(index);
    };

    const handleAddVideo = () => {
        if (url) {
            setVideoList([...videoList, { url, title: `Video ${videoList.length + 1}` }]);
            setUrl('');
        }
    };

    const handleDeleteVideo = (index: number) => {
        setVideoList(videoList.filter((_, i) => i !== index));
    };

    const handleTogglePlay = () => {
        setPlaying(!playing);
    };

    const handleToggleLoop = () => {
        setLoop(!loop);
    };

    const handleToggleShuffle = () => {
        setShuffle(!shuffle);
    };

    const handleToggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleProgress = (state: { playedSeconds: number }) => {
        setPlayedSeconds(state.playedSeconds);
    };

    const handleDuration = (duration: number) => {
        setDuration(duration);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleThemeChange = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const reorderedVideos = Array.from(videoList);
        const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
        reorderedVideos.splice(result.destination.index, 0, movedVideo);
        setVideoList(reorderedVideos);
    };

    const handleAddToFavorites = (index: number) => {
        const videoToAdd = videoList[index];
        if (!favoriteVideos.find(video => video.url === videoToAdd.url)) {
            setFavoriteVideos([...favoriteVideos, videoToAdd]);
        }
    };

    const handleRemoveFromFavorites = (index: number) => {
        const updatedFavorites = favoriteVideos.filter((_, i) => i !== index);
        setFavoriteVideos(updatedFavorites);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'Space':
                handleTogglePlay();
                break;
            case 'ArrowRight':
                handleNext();
                break;
            case 'ArrowLeft':
                handlePrevious();
                break;
            case 'ArrowUp':
                setVolume(Math.min(volume + 0.1, 1));
                break;
            case 'ArrowDown':
                setVolume(Math.max(volume - 0.1, 0));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [volume]);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AppBar>
                <AppBarTitle>My Video Player</AppBarTitle>
            </AppBar>
            <StyledContainer>
                <SearchBar>
                    <SearchInput
                        type="text"
                        placeholder="Enter YouTube URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <ControlButton onClick={handleAddVideo}>Add Video</ControlButton>
                    <ControlButton onClick={handleThemeChange}>
                        {theme === lightTheme ? 'Dark Mode' : 'Light Mode'}
                    </ControlButton>
                </SearchBar>
                <PlayerWrapper>
                    <ReactPlayer
                        ref={playerRef}
                        url={videoList[currentVideoIndex]?.url}
                        playing={playing}
                        loop={loop}
                        controls={false}
                        volume={volume}
                        width="100%"
                        height={isFullscreen ? '100vh' : '720px'}
                        onEnded={handleNext}
                        onProgress={handleProgress}
                        onDuration={handleDuration}
                    />
                    <PlayerControlsWrapper>
                        <TimeDisplay>
                            {formatTime(playedSeconds)} / {formatTime(duration)}
                        </TimeDisplay>
                        <PlayerControls>
                            <ControlButton onClick={handlePrevious}>Previous</ControlButton>
                            <ControlButton onClick={handleTogglePlay}>{playing ? 'Pause' : 'Play'}</ControlButton>
                            <ControlButton onClick={handleNext}>Next</ControlButton>
                            <ControlButton onClick={handleToggleLoop}>{loop ? 'Loop: On' : 'Loop: Off'}</ControlButton>
                            <ControlButton onClick={handleToggleShuffle}>{shuffle ? 'Shuffle: On' : 'Shuffle: Off'}</ControlButton>
                            <ControlButton onClick={handleToggleFullscreen}>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</ControlButton>
                        </PlayerControls>
                        <PlayerControls>
                            <label>
                                Volume:
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                />
                            </label>
                        </PlayerControls>
                    </PlayerControlsWrapper>
                </PlayerWrapper>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="playlist">
                        {(provided) => (
                            <Playlist ref={provided.innerRef} {...provided.droppableProps}>
                                {videoList.map((video, index) => (
                                    <Draggable key={video.url} draggableId={video.url} index={index}>
                                        {(provided) => (
                                            <PlaylistItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                isActive={index === currentVideoIndex}
                                                onClick={() => handleVideoSelect(index)}
                                            >
                                                {video.title}
                                                <div>
                                                    <FavoriteButton
                                                        isFavorite={!!favoriteVideos.find(favVideo => favVideo.url === video.url)}
                                                        onClick={() => handleAddToFavorites(index)}
                                                    >
                                                        ★
                                                    </FavoriteButton>
                                                    <button onClick={() => handleDeleteVideo(index)}>Delete</button>
                                                </div>
                                            </PlaylistItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Playlist>
                        )}
                    </Droppable>
                </DragDropContext>
                {favoriteVideos.length > 0 && (
                    <FavoriteList>
                        <h3>Favorite Videos</h3>
                        {favoriteVideos.map((video, index) => (
                            <FavoriteItem key={index}>
                                {video.title}
                                <button onClick={() => handleRemoveFromFavorites(index)}>Remove</button>
                            </FavoriteItem>
                        ))}
                    </FavoriteList>
                )}
            </StyledContainer>
        </ThemeProvider>
    );
};

export default App;
