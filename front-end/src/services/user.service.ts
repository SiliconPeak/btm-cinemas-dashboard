// import {
//   httpDeleteRequest,
//   httpGetRequest,
//   httpPutRequest,
// } from "./axios.service";

// export const getUsers = async () => {
//   try {
//     let response = await httpGetRequest("/user", false);
//     if (response) {
//       return response;
//     }
//   } catch (error) {}
// };

// export const getUserById = async (id: number) => {
//   try {
//     let response = await httpGetRequest("/user/" + id, true);
//     if (response.status) {
//       return response;
//     }
//   } catch (error) {}
// };
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoxLCJuYW1lIjoiQmltYWwgTWFnYXIiLCJpYXQiOjE2Nzk4MDE1NzgsImV4cCI6MTY3OTg4Nzk3OH0.umm13EtY0BvqXC5FFx8GqaA4UaRYxD-KFIAwDCQTXDk";

export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:9003/api/v1/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    alert(err);
  }
};

export const registerUser = async (body: any) => {
  try {
    const response = await fetch("http://localhost:9003/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};
