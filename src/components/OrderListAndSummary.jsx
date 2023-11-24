import { useEffect, useState } from 'react'
import axios from 'axios';

export const OrderListAndSummary = () => {
    const [total, setTotal] = useState(0);
    const order = [
        {
            name: "Margarita A",
            id: 2,
            price: 412.00,
            ingredients: "crab & cucumber"
        },
        {
            name: "Margarita B",
            id: 1,
            price: 112.00,
            ingredients: "tuna & cucumber"
        },
        {
            name: "Margarita C",
            id: 3,
            price: 1236.00,
            ingredients: "smoked salmon over rice with extra sauce to check if this line works"
        },

    ];

    useEffect(() => {
        let sum = 0;
        for (let i = 0; i < order.length; i++) {
            sum += order[i].price;
        }
        setTotal(sum)
    })

    const initPayment = (data) => {
        const options = {
            key: "rzp_test_cmkZnIOVEjyaS0", 
            amount: data.amount,
            currency: data.currency,
            description: "Test Order",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = "http://localhost:8080/api/payment/verify";
                    const { data } = await axios.post(verifyUrl, response)
                    console.log(response)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8080/api/payment/orders", { amount: total });
            console.log(res.data)
            initPayment(res.data.data)
            alert("Order placed")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='OrderListAndSummaryCont'>
            <div className='heading'>
                <h2>Your Order</h2>
                <h3>Add items +</h3>
            </div>
            <div>
                {order.map((dish) => {
                    return (
                        <div key={dish.id} className='dish'>
                            <div className='b1'>
                                <h3 className='id'>{dish.id}</h3>
                                <div>
                                    <h3>{dish.name}</h3>
                                    <p className='ingred'>{dish.ingredients}</p>
                                </div>
                            </div>
                            <div className='b2'>
                                <h3>₹{dish.price}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='summary_Cont'>
                <div className='summary'>
                    <h2>Summary</h2>
                </div>
                <div className='totalContList'>
                    <div className='totalContListItem'>
                        <h3 >Subtotal</h3>
                        <h3 >₹{total}</h3>
                    </div>
                    <div className='totalContListItem discount'>
                        <h3 >Discount</h3>
                        <h3 >-₹759.50</h3>
                    </div>
                    <div className='totalContListItem'>
                        <h3 >Delivery Fee</h3>
                        <h3 >₹12.00</h3>
                    </div>
                    <div className='totalContListItem'>
                        <h3 >Taxes</h3>
                        <h3 >₹46.15</h3>
                    </div>
                    <div className='totalContListItem totalContListItemTotal'>
                        <h3 >Total</h3>
                        <h3 >₹1058.65</h3>
                    </div>

                    <button className='placeOrderBtn' onClick={handleSubmit}>
                        PLACE ORDER
                    </button>
                </div>

            </div>
        </div>
    )
}
