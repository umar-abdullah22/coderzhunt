import axios from "axios"
import { toast } from 'react-toastify';


export const createPaymentIntent = async (cart, currency) => {
    const products = cart.map(item => {
        return {
            item: parseInt(item.id),
            title: item.packageName,
            price: item.amount,
            quantity: item.noOfCoins
        }
    })
    const accessToken =JSON.parse (localStorage.getItem('token'));
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    try {
        const transaction = await axios.post("http://localhost:5500/api/payments/stripe", {
            products: products,
            currency: currency,
            token: accessToken
        }, config);
        toast.success('Transaction successful!', {
            position: toast.POSITION.TOP_RIGHT,
        });
        return transaction;
    } catch (error) {
        toast.error('Transaction Unsuccessful!', {
            position: toast.POSITION.TOP_RIGHT,
        });
        return error;
    }
}