import cookie from "js-cookie";
const API = process.env.BASE_URL;

// set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
// get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

// localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};
// authenticate user by pass data to cookie and localstorage

export const authenticate = (data) => {
  setCookie("refreshtoken", data.refresh_token, {
    path: "api/auth/accessToken",
    expires: 7,
  });

  localStorage.setItem("firstLogin", true);
  setLocalStorage("user", data.user);
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("refreshtoken");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
