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
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(stock[0]).map((eachKey) => (
              <th key={eachKey} className="text-center">{eachKey}</th>
            ))}
            <th className="text-center">Edit</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => {
            const { _id: id } = item;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">{`$ ${item.price}`}</td>
                <td>{item.product}</td>
                <td>{item.client}</td>
                <td>
                  {item.active
                    ? <AiOutlineCheckCircle size="25" fill="green" />
                    : <BsXCircle size="22" fill="red" />}
                </td>
                <td className="text-center">
                  <Link className="btn btn-warning" to={`/item/${id}`}>Select</Link>
                </td>
                <td className="text-center">
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
    <Container>
      <h1 className="pt-3">ABM Stock</h1>
      <div className="nav justify-content-end">
        <Link to="/item" className="btn btn-primary m-3">Add new Item</Link>
      </div>
      <div className="text-center">{stock ? table() : <Loading />}</div>
    </Container>
  );
}
