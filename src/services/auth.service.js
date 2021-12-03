import { fetchWrapper } from "./fech-wrapper";

const baseUrl = `${process.env.REACT_APP_API_URL}/auth`;

export const TOKEN_KEY = "invest-Token";
export const USER_KEY = "invest-User";

export const authService = {
  isAuthenticated,
  getToken,
  setToken,
  getUser,
  login,
  logout,
};

function isAuthenticated() {
  return localStorage.getItem(TOKEN_KEY) !== null;
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch (error) {
    return "";
  }
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function setUser(token) {
  localStorage.setItem(USER_KEY, JSON.stringify(token));
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
async function login(email, pass) {
  const payload = { email, pass };

  var response = await fetchWrapper.postNoAuth(`${baseUrl}/auth`, payload);
  if (response) {
    if (response["x-access-token"]) {
      if (response.identity) {
        setUser(response.identity);
      }

      setToken(response["x-access-token"]);
      return true;
    }
  }
  return false;
}
