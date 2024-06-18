import React from "react";
import { Link } from "react-router-dom";
import "./styling.css";

function ReservationTableRow({ reservation, onDelete }) {
  const handleDelete = () => {
    onDelete(reservation._id);
  };

  return (
    <tr>
      <td>{reservation.name}</td>
      <td>{reservation.email}</td>
      <td>{new Date(reservation.date).toLocaleDateString()}</td>
      <td>
        <Link to={`/update-reservation/${reservation._id}`}>
          <button className="edit-button">Edit Reservation</button>
        </Link>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default ReservationTableRow;
