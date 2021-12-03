import { authService } from "./auth.service";

export const fetchWrapper = {
  get,
  getWithHeaders,
  geWithOptions,
  post,
  postNoAuth,
  put,
  patch,
  delete: _delete,
  upload,
};

function getHeaders(auth) {
  var header = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (auth) header["Authorization"] = "Bearer " + authService.getToken();

  return header;
}

function get(url) {
  const requestOptions = {
    crossDomain: true,
    method: "GET",
    headers: getHeaders(true),
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

function postNoAuth(url, body) {
  const requestOptions = {
    crossDomain: true,
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

function getWithHeaders(url, headers) {
  const requestOptions = {
    crossDomain: true,
    method: "GET",
    headers: headers,
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

function geWithOptions(url, requestOptions) {
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

function post(url, body) {
  const requestOptions = {
    crossDomain: true,
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

function put(url, body) {
  const requestOptions = {
    crossDomain: true,
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(body),
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

function patch(url, body) {
  const requestOptions = {
    crossDomain: true,
    method: "PATCH",
    headers: getHeaders(true),
    body: JSON.stringify(body),
  };

  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, id) {
  const requestOptions = {
    crossDomain: true,
    method: "DELETE",
    headers: getHeaders(true),
    body: JSON.stringify({ id: id }),
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

function upload(url, file) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + authService.getToken(),
  };
  const requestOptions = {
    crossDomain: true,
    method: "POST",
    headers: headers,
    body: file,
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(function (error) {
      console.error(error);
    });
}

// helper functions

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      console.log(error);
      if (error === "Unauthorized" || error.includes("Token invalid")) {
        window.location.href = "/#/auth/signin";
      }
      return Promise.reject(error);
    }

    return data;
  });
}
