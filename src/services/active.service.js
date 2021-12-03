import { fetchWrapper } from "./fech-wrapper";

const baseUrl = `${process.env.REACT_APP_API_URL}/actives`;

export const activeService = {
  getAll,
  getById,
  getByCategory,
  create,
  update,
  delete: _delete,
  upload,
};

async function getAll() {
  return await fetchWrapper.get(baseUrl);
}

function getByCategory(id) {
  return fetchWrapper.get(`${baseUrl}/category/${id}`);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(params) {
  return fetchWrapper.put(baseUrl, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function upload(file) {
  return fetchWrapper.upload(`${baseUrl}/upload`, file);
}
