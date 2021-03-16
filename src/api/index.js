const idCrudCrud = '83e47f77730c4ba6add4ecca584500c3';
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
  // console.log(fetchResult);
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
