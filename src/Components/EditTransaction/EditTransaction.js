import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams} from "react-router-dom"

function EditTransaction() {
  const [formData, setFormData] = useState({
    item_name: '',
    amount: 0,
    date: '',
    from: '',
    category: '',
  });

  const id = useParams().id
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3003/transactions/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3003/transactions/${id}`, formData)
      .then((response) => {
        console.log('Item updated:', response.data);
        navigate(`/transactions/${id}`);
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

 

  return (
    <div className="edit-item">
      <h2>Edit Item</h2>
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditTransaction;
