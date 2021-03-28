import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4200/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setBookings(data);
            })
    }, [])
    return (
        <div>
            <h1>Total Book {bookings.length}</h1>
            {bookings.map(book => <li key={book._id} >Name: {book.name} From: {new Date(book.checkIn).toDateString('dd/MM/yyy')} To: {new Date(book.checkOut).toDateString('dd/MM/yyy')}</li>)}
        </div>
    );
};

export default Bookings;