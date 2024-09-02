import { useState, useEffect } from "react";

export function usePageSize() {
  const [pageSize, setPageSize] = useState(16);

  useEffect(() => {
    function updatePageSize() {
      const width = window.innerWidth;
      if (width <= 768) {
        setPageSize(6); // 모바일
      } else if (width <= 1024) {
        setPageSize(8); // 태블릿
      } else {
        setPageSize(16); // 데스크탑
      }
    }

    updatePageSize(); // 초기 설정
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  return pageSize;
}
