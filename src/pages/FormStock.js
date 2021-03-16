import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById, insertProduct } from '../api';

export default function FormStock() {
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [product, setProduct] = useState('');
  const [client, setClient] = useState('');
  const [active, setActive] = useState('');
  const [preventLoop, setPreventLoop] = useState(true);

  const { id } = useParams();

  useEffect(async () => {
    if (id && preventLoop) {
      setUserId(id);
      setPreventLoop(false);
      const itemById = await getItemById(id);
      setQuantity(itemById.quantity);
      setPrice(itemById.price);
      setProduct(itemById.product);
      setClient(itemById.client);
      setActive(itemById.active);
    }
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const body = {
      quantity, price, product, client, active,
    };

    if (id) return insertProduct(body);
    return getItemById(id); // updateItemById
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <input id="id" value={userId} type="text" placeholder="Id" readOnly disabled />
        <input id="quantity" value={quantity} type="text" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
        <input id="product" value={product} type="text" placeholder="Product name" onChange={(e) => setProduct(e.target.value)} />
        <input id="price" value={price} type="text" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
        <input id="client" value={client} type="text" placeholder="Client" onChange={(e) => setClient(e.target.value)} />
        <input id="active" value={active} type="text" placeholder="Active" onChange={(e) => setActive(e.target.value)} />
        <button type="submit">{(id) ? 'Update a product' : 'Register a new product'}</button>
      </form>
    </div>
  );
}
