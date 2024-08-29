import axios from "axios";

const BASE_URL = "https://fandom-k-api.vercel.app/9-2/donations";

// GET - getDonation: 특정 ID의 조공 데이터를 가져옵니다.
// 작동예시 = getDonation(cursor,pageSize) < type(number)
export const getDonation = async (cursor = 0, pageSize = 10) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        cursor: cursor,
        pageSize: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching donation:", error);
    throw error;
  }
};

// POST - createDonation: 새로운 기부 데이터를 생성합니다.
// {
//   "deadline": "2024-08-28T05:06:02.943Z",
//   "targetDonation": 0,
//   "subtitle": "string",
//   "title": "string",
//   "idolId": 0
// }
export const createDonation = async (donationData) => {
  try {
    const response = await axios.post(BASE_URL, donationData);
    return response.data;
  } catch (error) {
    console.error("Error creating donation:", error);
    throw error;
  }
};

// PUT - updateDonation: 기존 기부 데이터를 업데이트합니다.
// donationData = {
//   "deadline": "2025-10-10T00:00:00.000Z",
//   "targetDonation": 1000000
// }
export const updateDonation = async (id, donationData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, donationData);
    return response.data;
  } catch (error) {
    console.error("Error updating donation:", error);
    throw error;
  }
};

// PUT(2) - toSponDonation: 특정 ID의 조공에 후원하는 기능입니다.
// sponsorData = {
//   "amount": 10000
// }
export const toSponDonation = async (id, sponsorData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${id}/contribute`,
      sponsorData,
    );
    return response.data;
  } catch (error) {
    console.error("Error sponsoring donation:", error);
    throw error;
  }
};

// DELETE - deleteDonation: 특정 ID의 기부 데이터를 삭제합니다.
export const deleteDonation = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting donation:", error);
    throw error;
  }
};
