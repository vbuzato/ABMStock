import React, { useEffect, useState } from 'react';
import { Col, Container, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { getItemById, insertProduct, updateItemById } from '../api';

export default function FormStock() {
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [product, setProduct] = useState('');
  const [client, setClient] = useState('');
  const [active, setActive] = useState(false);
  const [preventLoop, setPreventLoop] = useState(true);

  const { id } = useParams();
  const history = useHistory();
  useEffect(async () => {
    if (id && preventLoop) {
      setUserId(id);
      const itemById = await getItemById(id);
      setPreventLoop(false);
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

    if (id) {
      await updateItemById(id, body);
    } else {
      await insertProduct(body);
    }
    history.push('/');
  };

  return (
    <Container className="nav justify-content-center w-50 flex-column">
      <h1 className="pt-3 text-center">ABM Stock</h1>
      <h6 className="text-center font-italic">Product register page</h6>
      <Form onSubmit={onSubmitForm} className="w-100 d-flex flex-wrap pt-4">
        {id && (
        <Col sm="12">
          <Form.Label htmlFor="id" className="w-100">
            Id
            <input id="id" value={userId} type="text" className="form-control w-100" readOnly disabled />
          </Form.Label>
        </Col>
        )}
        <Col sm="4">
          <Form.Label htmlFor="quantity" className="w-100">
            Quantity
            <input
              id="quantity"
              className="form-control"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Form.Label>
        </Col>
        <Col sm="8">
          <Form.Label htmlFor="product" className="w-100">
            Product name
            <input
              id="product"
              className="form-control"
              value={product}
              type="text"
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </Form.Label>
        </Col>
        <Col sm="6">
          <Form.Label htmlFor="price" className="w-100">
            Price
            <input
              id="price"
              value={price}
              type="number"
              placeholder="$"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Label>
        </Col>
        <Col sm="6">
          <Form.Label htmlFor="client" className="w-100">
            Client
            <input
              id="client"
              value={client}
              type="text"
              className="form-control"
              onChange={(e) => setClient(e.target.value)}
              required
            />
          </Form.Label>
        </Col>
        <Col sm="6">
          <Form.Label htmlFor="active" className="w-100 m-4">
            <input id="active" checked={active} type="checkbox" placeholder="Active" onChange={() => setActive(!active)} />
            <span className="ml-3">Active</span>
          </Form.Label>
        </Col>
        <Col className="form-group row w-75 justify-content-center m-3">
          <button type="submit" className="btn btn-primary">{id ? 'Update a product' : 'Register a new product'}</button>
        </Col>
      </Form>
    </Container>
  );
}
