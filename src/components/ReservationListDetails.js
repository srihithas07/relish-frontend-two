import React, { useEffect, useState } from "react";
import axios from "axios";
import ReservationTableRow from "./ReservationTableRow";
import "./reservstyles.css";

function ReservationListDetails() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios
      .get("https://restaurant-backend-one-1.onrender.com/reservationRoute/reservation-details")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteReservation = (id) => {
    axios
      .delete('https://restaurant-backend-one-1.onrender.com/reservationRoute/deletereservation/${id}')
      .then((response) => {
        if (response.status === 200) {
          alert("Reservation deleted successfully");
          setReservations(reservations.filter((reservation) => reservation._id !== id));
        } else {
          Promise.reject();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="reservation-list-container">
      <h2>Reservation Details</h2>
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <ReservationTableRow
              key={reservation._id}
              reservation={reservation}
              onDelete={deleteReservation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationListDetails;
