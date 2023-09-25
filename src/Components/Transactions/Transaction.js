import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Transaction() {
    const [transactionArray, setTransactionArray] = useState([])
    const [transaction, setTransaction] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    let id = useParams().id

    async function fetchData() {
        try {
          let result = await axios.get(`http://localhost:3003/transactions`);
          setTransactionArray(result.data);

          let foundIndex = result.data.findIndex((item) => {
            return item.id === id
          })

          setTransaction(result.data[foundIndex])
        } catch (e) {
          console.log(e);
        }
    }

    function handleEdit() {
        navigate(`/transactions/${transaction.id}/edit`)
    }

    function handleBackButton() {
        navigate(`/transactions`)
    }

    const handleDelete = () => {
      axios.delete(`http://localhost:3003/transactions/${id}`)
        .then(() => {
          navigate(`/transactions`)
        })
        .catch((error) => {
          console.error('Error deleting resource:', error);
        });
    };


  return (
    <div className="show-page">

      <h2>{transaction.item_name}</h2>
      <p>Category: {transaction.category}</p>
      <p>Amount: ${transaction.amount}</p>
      <p>Date: ${transaction.date}</p>

      <div className="actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleBackButton}>Back</button>
      </div>
    </div>
  );
}

export default Transaction
