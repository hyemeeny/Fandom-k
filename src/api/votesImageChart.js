import axios from "axios";

const SERVER_URL = "https://fandom-k-api.vercel.app";

export const postVotes = async (id) => {
  try {
    const response = await axios.post(`${SERVER_URL}/9-2/votes`, {
      idolId: id,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message || "관리자에게 문의 부탁드립니다.",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "서버에서 응답을 받지 못했습니다.",
      };
    } else {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

export const postImage = async (url) => {
  try {
    const response = await axios.post(`${SERVER_URL}/images/upload`, {
      url: url,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message || "관리자에게 문의 부탁드립니다.",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "서버에서 응답을 받지 못했습니다.",
      };
    } else {
      return {
        success: false,
        message: error.message,
      };
    }
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

    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message || "관리자에게 문의 부탁드립니다.",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "서버에서 응답을 받지 못했습니다.",
      };
    } else {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};
