// 在真实环境中，如果使用 firebase 这种第三方 auth 服务的话，本文件不需要开发者开发

import { User } from "screens/project-list/search-panel";

const localStorageKey = "__auth_provider_token__";
const apiURL = process.env.REACT_APP_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
    return Promise.reject(data);
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
    return Promise.reject(data);
  });
};

export const loginOut = async () =>
  window.localStorage.removeItem(localStorageKey);
