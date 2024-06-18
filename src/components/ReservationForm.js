import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendar } from 'react-icons/fa';
import './formstyles.css';

const ReservationForm = ({ addReservation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [tablesStatus, setTablesStatus] = useState(Array(15).fill('available'));
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const tablesInRow = 5;

  const closeSuccessMessage = () => {
    setSuccessMessage('');
  };

  useEffect(() => {
    let timeoutId;

    if (successMessage) {
      timeoutId = setTimeout(() => {
        closeSuccessMessage();
      }, 50000); // Auto-close after 10 seconds
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage]);
  const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Random 6-digit code
  };

  let handleSubmit = (event) => {
    const obj = {
      name,
      email,
      date: new Date(date).toISOString(),
    };

    const url = 'https://restaurant-reservation-backend-iiey.onrender.com/reservationRoute/create-reservation';
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          const code = generateRandomCode();
          setConfirmationCode(code);
          setSuccessMessage(`Reservation added successfully. Your confirmation code: ${code}`);
          setTablesStatus([...tablesStatus.slice(0, selectedTable), 'booked', ...tablesStatus.slice(selectedTable + 1)]);
          setSelectedTable(null);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });

    event.preventDefault();
  };

  const handleTableClick = (tableIndex) => {
    if (tablesStatus[tableIndex] === 'available') {
      setSelectedTable(tableIndex);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/table.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Restaurant Reservation System</h1>
      <h2>Reserve your table</h2>
      <nav
        style={{
          backgroundColor: '#333',
          padding: '10px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
          <FaUser style={{ marginRight: '10px' }} />
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
            required
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
          <FaEnvelope style={{ marginRight: '10px' }} />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#fff' }}>
          <FaCalendar style={{ marginRight: '10px' }} />
          <input
            type='datetime-local'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder='Date'
            required
          />
        </div>
        <h2>Choose a table</h2>
        <div className='table-buttons'>
          {tablesStatus.map((status, index) => (
            <React.Fragment key={index}>
              {index % tablesInRow === 0 && index !== 0 && <br />}
              <button
                className={`table-button ${status} ${selectedTable === index ? 'selected' : ''}`}
                onClick={() => handleTableClick(index)}
                disabled={status === 'booked'}
              >
                {index + 1}
              </button>
            </React.Fragment>
          ))}
        </div>
      </nav>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <button type='submit'>Submit</button>
      </form>
      <h4>
        <Link to='/reservation-details'>View Reservation</Link>
      </h4>
      <h4>
        <Link to='/update-reservation'>Edit Reservation</Link>
      </h4>
      {successMessage && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: 'rgba(0, 139, 139, 0.9)',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <button
            onClick={closeSuccessMessage}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            &times;
          </button>
          <h2 style={{ color: 'green' }}>Success!</h2>
          <p style={{ fontSize: '18px', color: 'indigo' }}>{successMessage}</p>
          <p>Please save the confirmation Code</p>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;
