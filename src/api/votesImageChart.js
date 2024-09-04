import axios from "axios";

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

export const getCharts = async ({ gender, cursor, pageSize }) => {
  try {
    const response = await axios.get(`${SERVER_URL}/9-2/charts/{gender}`, {
      params: {
        gender: gender,
        cursor: cursor,
        pageSize: pageSize,
      },
    });

    return {
      ...response.data,
    };
  } catch (error) {
    console.error("차트를 가져오는데 실패했습니다.", error);
    throw error;
  }
};
