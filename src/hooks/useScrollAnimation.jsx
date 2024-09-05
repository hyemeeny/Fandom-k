import { useEffect, useRef } from "react";

export const useScrollAnimation = () => {
  const target1 = useRef(null);
  const target2 = useRef(null);
  const target3 = useRef(null);

  useEffect(() => {
    const onIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 나타났을 경우
          entry.target.classList.add("show");
          entry.target.classList.remove("hide");
        } else {
          // 요소가 뷰포트를 벗어난 경우
          entry.target.classList.remove("show");
          entry.target.classList.add("hide");
        }
      });
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(onIntersect, options);
    [target1, target2, target3].forEach((target) => {
      // 요소 관찰 시작
      if (target.current) observer.observe(target.current);
    });

    // 컴포넌트 언마운트 시 관찰 중단
    return () => observer.disconnect();
  }, []);

  return { target1, target2, target3 };
};
