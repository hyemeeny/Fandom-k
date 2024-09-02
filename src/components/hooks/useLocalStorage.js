import { atom, useAtom } from "jotai";
import { useEffect } from "react";

// 로컬 스토리지에서 초기값을 가져오는 유틸리티 함수
function getInitialValue(key, initialValue) {
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  } catch (error) {
    console.error("로컬스토리지의 값을 가져오는데 실패하였습니다.", error);
    return initialValue;
  }
}

// credit 값을 관리하는 atom 생성
export const creditAtom = atom(getInitialValue("credit", 0));

// 로컬 스토리지와 동기화하는 커스텀 훅
export function useCredit() {
  const [credit, setCredit] = useAtom(creditAtom);

  useEffect(() => {
    try {
      // credit 값이 변경될 때마다 로컬 스토리지에 저장
      window.localStorage.setItem("credit", JSON.stringify(credit));
    } catch (error) {
      console.error("로컬 스토리지에 값을 설정하는 데 실패했습니다.", error);
    }
  }, [credit]);

  return [credit, setCredit];
}
