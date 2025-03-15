import { createContext, useState, useContext } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { MapContext } from "./MapContext";


export const PaymentContext = createContext(null);

const PaymentContextProvider = ({ children }) => {
    const [amount, setAmount] = useState(0);
    const { selectedCar, fromValue, toValue } = useContext(MapContext);


    const handlePayment = async () => {
        console.log("Payment button clicked");
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_HOST_URL}/payment/order`,
                { amount },
                {
                    headers: {
                        'content-type': 'application/json',
                    },
                }
            );

            const data = res.data;
            console.log("Order created:", data);
            handlePaymentVerify(data.data);
        } catch (error) {
            console.log("Error during payment:", error);
            toast.error("Failed to create payment order. Please try again.");
        }
    };

    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: 'CabBooking',
            description: 'Cab Booking Payment',
            order_id: data.id,
            handler: async (response) => {
                console.log('Payment response:', response);
                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_BACKEND_HOST_URL}/payment/verify`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            amount,
                            car_name: selectedCar.name,
                            fromValue,
                            toValue
                        },
                        {
                            headers: {
                                'content-type': 'application/json',
                            },
                            withCredentials: true,
                        }
                    );

                    const verifyData = res.data;

                    if (verifyData.message) {
                        toast.success(verifyData.message);
                        window.location.href = '/payment-completed';
                        // PaymentHistory(response.razorpay_order_id, response.razorpay_payment_id);
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    toast.error("Payment verification failed. Please try again.");
                }
            },
            prefill: {
                name: 'Customer Name',  
                email: 'customer@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
            method: {
                upi: true,
                card: true,
                netbanking: true,
                wallet: true,
                paylater: true,
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        // Handling when the Razorpay modal is closed by the user
        rzp1.on('payment.failed', (response) => {
            console.error('Payment failed:', response.error);
            toast.error("Payment failed. Please try again.");
        });
    };

    return (
        <PaymentContext.Provider value={{ amount, setAmount, handlePayment }}>
            {children}
        </PaymentContext.Provider>
    );
};

export default PaymentContextProvider;
