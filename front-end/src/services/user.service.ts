import {
  httpDeleteRequest,
  httpGetRequest,
  httpPutRequest,
} from "./axios.service";

export const getUsers = async () => {
  try {
    let response = await httpGetRequest("/user", false);
    if (response) {
      return response;
    }
  } catch (error) {}
};

export const getUserById = async (id: number) => {
  try {
    let response = await httpGetRequest("/user/" + id, true);
    if (response.status) {
      return response;
    }
  } catch (error) {}
};
