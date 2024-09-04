import { useEffect, useRef } from "react";

export const useGlobalAudio = () => {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false); // 오디오 재생 상태를 추적하기 위한 Ref

  useEffect(() => {
    const audio = new Audio("/audio/background-music.mp3");
    audio.loop = true;
    audioRef.current = audio;

    const playAudio = () => {
      if (audioRef.current && !isPlayingRef.current) {
        // 오디오가 재생 중이지 않은 경우에만 재생
        isPlayingRef.current = true; // 재생 상태로 설정
        audioRef.current.volume = 0;
        audioRef.current.play().catch((error) => {
          console.log(error);
        });

        // 서서히 볼륨을 증가시키는 함수
        let volume = 0;
        const fadeInInterval = setInterval(() => {
          if (volume < 1) {
            volume += 0.01; // 볼륨 증가 속도
            audioRef.current.volume = Math.min(volume, 1);
          } else {
            clearInterval(fadeInInterval); // 볼륨이 최대치에 도달하면 인터벌을 정리합니다
          }
        }, 100); // 볼륨 증가 주기
      }
    };

    document.addEventListener("click", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        isPlayingRef.current = false; // 재생 상태 초기화
      }
    };
  }, []);

  return audioRef;
};
