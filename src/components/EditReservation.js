import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './edit.css';

function EditReservation() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const obj1 = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/update-reservation/" + obj1.id)
      .then((res) => {
        if (res.status === 200) {
          setName(res.data.name);
          setEmail(res.data.email);
          setDate(res.data.date);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [obj1.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/reservationRoute/update-reservation/" + obj1.id;
    const newData = { name, email, date };
    axios
      .put(url, newData)
      .then((res) => {
        if (res.status === 200) {
          alert("Reservation updated successfully");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="reservation-card">
      <form onSubmit={handleSubmit} className="horizontal-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="datetime-local"
            id="date"
            placeholder="Enter your preferred date"
            value={date || ''}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditReservation;