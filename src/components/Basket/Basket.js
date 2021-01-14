import React, { useEffect, useState } from 'react';

const Basket = ({ basket, removeItem }) => {
    const [basketItems, setBasketItems] = useState([])
    const [code, setCode] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);

    let discount = null;

    let totalAmount = null;

    useEffect(() => {
        setBasketItems(basket)
        setTotalPrice( basketItems.length > 0 ? basketItems.map((item) => parseFloat(item.price * item.amount)).reduce((a,b) => a + b, 0).toFixed(2) : null)
        
    }, [basket, basketItems])

    const handleChangeAmount = (id,newAmount) => {
        const itemToUpdate = basketItems.findIndex(item => item.id === id)
        basketItems.splice(itemToUpdate, 1, {...basketItems[itemToUpdate], ...newAmount})
        setBasketItems(basketItems);
        console.log(basketItems)
    }

    const removeFromBasketItems = (id) => {
        const itemToRemove = basketItems.findIndex(item => item.id === id)
        console.log(itemToRemove)
        basketItems.splice(itemToRemove, 1);
        setBasketItems(basketItems);
        console.log(basketItems);
        removeItem(id)
    }
    
    const handleCodeChange = (code) => {
        setCode(code)
    }

    const tryApplyDiscount = (code) => { 
        if(code === "EXTRA20") {
            discount = 20;
            console.log("discount should apply")
            totalAmount = (totalPrice / 100) * discount;
            setTotalPrice((totalPrice - totalAmount).toFixed(2))
        } 
    }



    return (

        <div>
            {basketItems.length > 0 ? <>
            <ul>
                {basketItems.length > 0 ? basketItems.map((item) => {
                    return <li key={item.id}>{item.name + " £" + item.price }<input type="number" value={item.amount} onChange={(e) => handleChangeAmount(item.id,{ amount: parseInt(e.target.value) })} />{" "}<button onClick={() => removeFromBasketItems(item.id)}>Remove from basket</button></li>
                }) : null}
            </ul>
            <br/>
            <label>Enter Discount Code</label>
            <input type="text" value={code} onChange={(e) => handleCodeChange(e.target.value)}/><button onClick={() => tryApplyDiscount(code)}>Apply Discount</button>
            <h2> Total Cost: £{totalPrice}</h2>
            </> : <h1>You currently have no items in your basket</h1>}

        </div>
    );
};

export default Basket;