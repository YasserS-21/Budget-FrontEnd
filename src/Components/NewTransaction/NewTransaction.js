import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function NewTransaction() {
  const [formData, setFormData] = useState({
    item_name: '',
    amount: 0,
    date: '',
    from: '',
    category: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3003/transactions', formData)
      .then((response) => {
        console.log('Item created:', response.data);

        setFormData({
          item_name: '',
          amount: 0,
          date: '',
          from: '',
          category: '',
        });
        navigate(`/transactions/${response.data.data.id}`)
      })
      .catch((error) => {
        console.error('Error creating item:', error);
      });
  };

  return (
    <div className="create-new-item">
      <h2>Create a New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item_name">Item Name:</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="from">From:</label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default NewTransaction;
