import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Add some basic styling

function App() {
    const [orderId, setOrderId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('INIT'); // INIT, PENDING, SUCCESS

    // This useEffect will poll for the payment status once an order is created
    useEffect(() => {
        if (!orderId) return;

        const interval = setInterval(async () => {
            try {
                const { data } = await axios.get(`https://payment-api-uimy.onrender.com/api/order-status/${orderId}`);
                if (data.status === 'SUCCESS') {
                    setPaymentStatus('SUCCESS');
                    clearInterval(interval); // Stop polling once success
                }
            } catch (error) {
                console.error('Error checking status:', error);
                clearInterval(interval);
            }
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [orderId]);

    const handlePayment = async () => {
        try {
            // 1. Call backend to create an order
            const { data } = await axios.post('https://payment-api-uimy.onrender.com/api/create-order');
            const { orderId: newOrderId, upiUrl } = data;

            setOrderId(newOrderId);
            setPaymentStatus('PENDING');

            // 2. Redirect to UPI app
            window.location.href = upiUrl;
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return (
        <div className="container">
            <h1>Mythical Payments</h1>
            <div className="order-summary">
                <p><strong>Item:</strong> Poseidon's Trident (Digital Access)</p>
                <p><strong>Amount:</strong> ₹1.00</p>
            </div>
            
            {paymentStatus === 'INIT' && (
                <button onClick={handlePayment}>Pay ₹1 via UPI</button>
            )}

            {paymentStatus === 'PENDING' && (
                <div className="status-pending">
                    <h2>Waiting for Payment Confirmation...</h2>
                    <p>Complete the payment in your UPI app. This page will update automatically.</p>
                </div>
            )}

            {paymentStatus === 'SUCCESS' && (
                <div className="status-success">
                    <h2>✅ Payment Successful!</h2>
                    <p>Your order is confirmed. Thank you!</p>
                </div>
            )}
        </div>
    );
}

export default App;