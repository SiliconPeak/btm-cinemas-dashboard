import authService from "./auth.services";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYsInJvbGVJZCI6MiwibmFtZSI6ImhlbGxvIiwiaWF0IjoxNjgwNTM3NDE0LCJleHAiOjE2ODA2MjM4MTR9.k2_ltJfeNapPb2ummH5juqGk-i-k5WgIfEi9BTU6c6U";

export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:9003/api/v1/user", {
      method: "GET",
      headers: authService.authHeader()
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

export const getUserById = async (id: any) => {
  try {
    const response = await fetch(`http://localhost:9003/api/v1/user/${id}`, {
      method: "GET",
      headers: authService.authHeader()
    });
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};

export const editUserById = async (id: any, body: any) => {
  try {
    console.log("Body: ", JSON.stringify(body));
    const response = await fetch(`http://localhost:9003/api/v1/user/${id}`, {
      method: "PUT",
      headers: authService.authHeader(),
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (err) {
    alert(err);
  }
};

export const deleteUser = async (id: any) => {
  try {
    const response = await fetch(`http://localhost:9003/api/v1/user/${id}`, {
      method: "DELETE",
      headers: authService.authHeader(),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};
