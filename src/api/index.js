const idCrudCrud = '54d6a8e33a8c48efab4114a141a1ce76';
const DBNname = 'Stock';

export async function insertProduct(body) {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  };
  const fetchResult = await fetch(`/${idCrudCrud}/${DBNname}`, options)
    .then((newUser) => newUser.json())
    .catch((err) => (err.message));

  return fetchResult;
}

export async function getAllItems() {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  };
  const fetchResult = await fetch(`/${idCrudCrud}/${DBNname}`, options)
    .then((data) => data.json())
    .catch((err) => (err.message));

  return fetchResult;
}

export async function getItemById(id) {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  };
  const itemById = await fetch(`/${idCrudCrud}/${DBNname}/${id}`, options)
    .then((data) => data.json())
    .catch((err) => (err.message));

  return itemById;
}

export async function updateItemById(id, body) {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify(body),
  };
  const fetchResult = await fetch(`/${idCrudCrud}/${DBNname}/${id}`, options)
    .then((newUser) => newUser.json())
    .catch((err) => (err.message));

  return fetchResult;
}

export async function deleteItemById(id) {
  const options = {
    headers: { 'content-type': 'application/json' },
    method: 'DELETE',
  };
  const itemById = await fetch(`/${idCrudCrud}/${DBNname}/${id}`, options)
    .then((data) => data.json())
    .catch((err) => (err.message));

  return itemById;
}
