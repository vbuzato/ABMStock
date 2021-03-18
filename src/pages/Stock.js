import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsXCircle } from 'react-icons/bs';
import { Alert } from 'react-bootstrap';
import { getAllItems, deleteItemById, onApiError } from '../api';
import Loading from '../components/Loading';

export default function Stock() {
  const [stock, setStock] = useState();
  const [preventLoop, setPreventLoop] = useState(true);

  useEffect(async () => {
    if (preventLoop) {
      setPreventLoop(false);
      setStock(await getAllItems());
    }
  }, []);

  const onDelete = async (id) => {
    await deleteItemById(id);
    setStock();
    setPreventLoop(true);
    setStock(await getAllItems());
  };

  const table = () => {
    if (stock.length === 0) return <Alert variant="secondary">Empty stock</Alert>;
    if (stock === onApiError) {
      return (
        <Alert variant="warning">
          {onApiError}
          {' '}
          - Consider changing the token
        </Alert>
      );
    }

    return (
      <Table striped bordered hover className="font-size-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Product name</th>
            <th>Product brand</th>
            <th>Client name</th>
            <th>Client email</th>
            <th>Active</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => {
            const { _id: id } = item;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{item.quantity}</td>
                <td>{`$ ${item.price}`}</td>
                <td>{item.product.name}</td>
                <td>{item.product.brand}</td>
                <td>{item.client.name}</td>
                <td>{item.client.email}</td>
                <td>
                  {item.active
                    ? <AiOutlineCheckCircle size="25" fill="green" />
                    : <BsXCircle size="22" fill="red" />}
                </td>
                <td>
                  <Link className="btn btn-warning" to={`/item/${id}`}>Select</Link>
                </td>
                <td>
                  <button className="btn btn-danger" type="button" onClick={() => onDelete(id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  return (
    <Container className="">
      <h1 className="pt-3">ABM Stock</h1>
      <div className="nav justify-content-end">
        <Link to="/item" className="btn btn-primary m-3">Add new Item</Link>
      </div>
      <div className="text-center">{stock ? table() : <Loading />}</div>
    </Container>
  );
}
