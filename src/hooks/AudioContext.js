import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/background-music.mp3"); // 오디오 파일 경로
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, []);

  const togglePlayback = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);

          // 서서히 볼륨을 증가시키는 함수
          let volume = 0;
          const fadeInInterval = setInterval(() => {
            if (volume < 0.5) {
              volume += 0.01;
              audioRef.current.volume = Math.min(volume, 0.5);
            } else {
              clearInterval(fadeInInterval);
            }
          }, 100);
        } catch (error) {
          console.error("재생 실패: ", error);
        }
      }
    }
  };

  return (
    <AudioContext.Provider value={{ togglePlayback, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
