import axios from "axios";
import { retryRequest } from "./retryApi";

const SERVER_URL = "https://fandom-k-api.vercel.app";

export const postVotes = async (id) => {
  try {
    const response = await axios.post(`${SERVER_URL}/9-2/votes`, {
      idolId: id,
    });

    return response.data;
  } catch (error) {
    console.error("투표 생성에 실패했습니다.", error);
    throw error;
  }
};

export const postImage = async (url) => {
  try {
    const response = await axios.post(`${SERVER_URL}/images/upload`, {
      url: url,
    });

    return response.data;
  } catch (error) {
    console.error("이미지를 생성하는데 실패했습니다.", error);
    throw error;
  }
};

// 차트 데이터를 조회하는 함수
export const getCharts = async ({ gender, cursor, pageSize }) => {
  // Axios 요청을 래핑하는 함수 정의
  const axiosRequestFunction = () =>
    axios.get(`${SERVER_URL}/9-2/charts/${gender}`, {
      params: {
        gender: gender,
        cursor: cursor,
        pageSize: pageSize,
      },
    });

  return retryRequest(axiosRequestFunction);
};
