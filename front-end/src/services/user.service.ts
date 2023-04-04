const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjoxLCJuYW1lIjoiRHVyZ2VuIFJhaSIsImlhdCI6MTY4MDYyOTUxNiwiZXhwIjoxNjgwNzE1OTE2fQ.sO5QUVo36yMofWIR10SgA7GftChXyZOFB7RlXODvAn4";
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

export const getUserById = async (id: any) => {
  try {
    const response = await fetch(`http://localhost:9003/api/v1/user/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
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
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err);
  }
};
