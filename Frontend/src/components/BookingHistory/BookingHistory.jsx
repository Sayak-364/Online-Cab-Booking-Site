import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST_URL}/payment/history`);
                setPayments(response.data);
            } catch (error) {
                console.error("Error fetching payments:", error);
                setError("Failed to load payment history.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) return <p className="text-center text-gray-600 text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

    return (
        <section className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Booking History</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-primaryGreen text-white text-xs sm:text-sm md:text-base uppercase font-semibold tracking-wider">
                            <th className="px-2 sm:px-4 py-3 text-left">Car Name</th>
                            <th className="px-2 sm:px-4 py-3 text-left">From</th>
                            <th className="px-2 sm:px-4 py-3 text-left">To</th>
                            <th className="px-2 sm:px-4 py-3 text-left">Amount</th>
                            <th className="px-2 sm:px-4 py-3 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id} className="border-b last:border-0 hover:bg-gray-100">
                                <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-700">{payment.car_name}</td>
                                <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-700">{payment.fromValue}</td>
                                <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-700">{payment.toValue}</td>
                                <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-700">₹{payment.amount}.00</td>
                                <td className="px-2 sm:px-4 py-4 whitespace-nowrap text-xs sm:text-sm md:text-base text-gray-700">{format(new Date(payment.date), 'yyyy-MM-dd')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default PaymentHistory;
