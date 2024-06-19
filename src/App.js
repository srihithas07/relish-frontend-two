import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import ReservationForm from './components/ReservationForm';
import ContactForm from './components/ContactForm';
import ReservationListDetails from './components/ReservationListDetails';
import EditReservation from './components/EditReservation';
import ReservationTableRow from './components/ReservationTableRow';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-reservation" element={<ReservationForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/reservation-details" element={<ReservationListDetails />} />
        <Route path="/update-reservation/:id" element={<EditReservation />} />
        <Route path="/delete-reservation" element={<ReservationTableRow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;