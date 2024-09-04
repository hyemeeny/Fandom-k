import { useEffect, useRef, useState } from "react";

export const useAudio = (musicPath) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(musicPath);
    audio.loop = true;
    audio.preload = "auto"; // 오디오 파일을 미리 로드
    audio.volume = 0; // 볼륨 0으로 설정
    audioRef.current = audio;

    // 자동으로 오디오를 재생
    const playAudio = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true); // 재생 상태 업데이트

          // 서서히 볼륨을 증가시키는 함수
          let volume = 0;
          const fadeInInterval = setInterval(() => {
            if (volume < 1) {
              volume += 0.01;
              audioRef.current.volume = Math.min(volume, 0.5);
            } else {
              clearInterval(fadeInInterval);
            }
          }, 100);
        } catch (error) {
          console.error("재생 실패했습니다: ", error);
        }
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false); // 재생 상태 초기화
      }
    };
  }, []);

  const togglePlayback = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false); // 재생 상태 업데이트
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true); // 재생 상태 업데이트
        } catch (error) {
          console.error("오디오 재생 실패: ", error);
        }
      }
    }
  };

  return [togglePlayback, isPlaying];
};
