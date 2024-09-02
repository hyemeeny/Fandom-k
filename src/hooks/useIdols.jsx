import { useEffect, useState } from "react";
import { getIdols } from "../api/idols";

export function useIdols(initialCursor, pageSize) {
  const [pages, setPages] = useState([]); // 초기값을 빈 배열로 설정
  const [cursor, setCursor] = useState(initialCursor);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const loadIdols = async (cursor, pageSize, isInitial = false) => {
    try {
      const result = await getIdols(cursor, pageSize);
      const { list, nextCursor } = result;

      setPages((prevPages) => (isInitial ? [list] : [...prevPages, list]));
      setCursor(nextCursor);
      setCurrentPageIndex((prevPageIndex) =>
        isInitial ? 0 : prevPageIndex + 1,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadIdols(initialCursor, pageSize, true);
  }, [initialCursor, pageSize]);

  return { pages, cursor, currentPageIndex, setCurrentPageIndex, loadIdols };
}
