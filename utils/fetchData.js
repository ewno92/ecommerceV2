const baseUrl = process.env.BASE_URL;
import cookie from "js-cookie";

export const getData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

// export const postData = async (url, post, token) => {
//   // const res = await fetch(`${baseUrl}/api/${url}`, {
//   const res = await fetch(`${baseUrl}/api/${url}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     body: JSON.stringify(post),
//   });

//   const data = await res.json();
//   return data;
// };

export const postData = async (url, post) => {
  // const res = await fetch(`${baseUrl}/api/${url}`, {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const signin = async (url, post, token) => {
  // const res = await fetch(`${baseUrl}/api/${url}`, {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const signOut = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/signout`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

export const putData = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const patchData = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
