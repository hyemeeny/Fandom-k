export const retryRequest = async (axiosRequestFunction, retryCount = 1) => {
  try {
    const response = await axiosRequestFunction();
    return response.data;
  } catch (err) {
    if (err.response) {
      // 서버에서 응답이 왔지만 500 에러가 발생한 경우
      if (err.response.status === 500 && retryCount > 0) {
        console.log(
          "500 에러 발생, 재시도 중... 남은 재시도 횟수:",
          retryCount,
        );
        return retryRequest(axiosRequestFunction, retryCount - 1); // 재요청
      }
    } else if (err.request) {
      // 네트워크 또는 CORS 문제 발생 (서버에 도달하지 않은 경우)
      console.error("네트워크 또는 CORS 오류 발생: ", err.message);

      if (retryCount > 0) {
        console.log(
          "CORS 또는 네트워크 문제, 재시도 중... 남은 재시도 횟수:",
          retryCount,
        );
        return retryRequest(axiosRequestFunction, retryCount - 1); // 재요청 시도
      } else {
        console.error("재시도 횟수 초과. 요청 실패.");
        throw new Error("CORS 또는 네트워크 문제로 인해 요청이 실패했습니다.");
      }
    } else {
      // 기타 예기치 못한 오류 처리
      console.error("예기치 못한 오류 발생: ", err.message);
      throw err;
    }
  }
};
