import React, { useEffect, useState } from 'react';

const Basket = ({ basket, removeItem }) => {
    const [basketItems, setBasketItems] = useState([])

    useEffect(() => {
        return setBasketItems(basket)
    }, [basket])

    const handleChangeAmount = (id,newAmount) => {
        const itemToUpdate =basketItems.findIndex(item => item.id === id)
        basketItems.splice(itemToUpdate, 1, newAmount)
    }

    const removeFromBasketItems = (id) => {
        const itemToRemove = basketItems.findIndex(item => item.id === id)
        basketItems.splice(itemToRemove, 1);
        setBasketItems(basketItems)
        removeItem(id)
    }

    return (

        <div>
            {basketItems.length > 0 ? <>
            <ul>
                {basketItems.length > 0 ? basketItems.map((item, index) => {
                    return <li key={index}>{item.name + " £" + item.price }<input type="number" value={item.amount} onChange={(e) => handleChangeAmount(item.id,{ amount: e.target.value })} />{" "}<button onClick={() => removeFromBasketItems(item.id)}>Remove from basket</button></li>
                }) : null}
            </ul>
            <br/>
            <h2> Total Cost: £{basketItems.length > 0 ? basketItems.map((item) => parseFloat(item.price * item.amount)).reduce((a,b) => a + b, 0).toFixed(2) : null}</h2>

            </> : <h1>You currently have no items in your basket</h1>}

        </div>
    );
};

export default Basket;