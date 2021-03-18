const idCrudCrud = '63d87cf0d36449d6b000eeeb437bf893';
const DBNname = 'Stock';

const onApiError = 'crudcrud.com issues or unexpected token';

const insertProduct = async (body) => {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  };
  const fetchResult = await fetch(`/${idCrudCrud}/${DBNname}`, options)
    .then((newUser) => newUser.json())
    .catch(() => onApiError);

  return fetchResult;
};

const getAllItems = async () => {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  };
  const fetchResult = await fetch(`/${idCrudCrud}/${DBNname}`, options)
    .then((data) => data.json())
    .catch(() => onApiError);

  return fetchResult;
};

const getItemById = async (id) => {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  };
  const itemById = await fetch(`/${idCrudCrud}/${DBNname}/${id}`, options)
    .then((data) => data.json())
    .catch(() => onApiError);

  return itemById;
};

const updateItemById = async (id, body) => {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(body),
  };
  const fetchResult = await fetch(`/${idCrudCrud}/${DBNname}/${id}`, options)
    .then((newUser) => newUser.json())
    .catch(() => onApiError);

  return fetchResult;
};

const deleteItemById = async (id) => {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'DELETE',
  };
  const itemById = await fetch(`/${idCrudCrud}/${DBNname}/${id}`, options)
    .then((data) => data.json())
    .catch(() => onApiError);

  return itemById;
};

export {
  onApiError,
  insertProduct,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
};
