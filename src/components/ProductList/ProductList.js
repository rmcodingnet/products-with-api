import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import ReactModal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";

const pagination = (data, page = 1, pageLimit = 50) => {
    let result = data.slice((page - 1) * pageLimit, page * pageLimit);
    return result;
}




const ProductList = ({ products, deleteProduct, addItem }) => {
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [criteria, setCriteria] = useState({ name: "", material: "", expiryDateOne: "", expiryDateTwo: "" });
    const [itemToBasket, setItemToBasket] = useState({})


    let materialList = products.length > 0 ? products.map((product) => product.type) : null;

    materialList = Array.from(new Set(materialList))



    const handleChangeCriteria = (newCriteria) => {
        setCriteria({ ...criteria, ...newCriteria })
    }

    const handleChangeAmount = (newAmount) => {
        setItemToBasket({...itemToBasket, ...newAmount});
    }

    let showStats = false;


    const filteredProducts = products
        .filter(item => {
            if (criteria.name !== "") {
                showStats = true;
                return item.name === criteria.name
            } else { return true }
        })
        .filter(item => {
            if (criteria.material !== "") {
                showStats = true;
                return item.type === criteria.material
            } else { return true }
        })
        .filter(item => {
            if (criteria.expiryDateOne !== "") {
                showStats = true;
                return moment(item.expiryDate).isSame(criteria.expiryDate) || moment(item.expiryDate).isAfter(criteria.expiryDate)
            } else { return true }
        })
        .filter(item => {
            if (criteria.expiryDateTwo !== "") {
                showStats = true;
                return moment(item.expiryDate).isSame(criteria.expiryDate) || moment(item.expiryDate).isBefore(criteria.expiryDate)
            } else { return true }
        })


    const openModal = (product) => {
        setItemToBasket({ ...product, amount: 1 })
        setShowModal(true)
    }

    return (
        <div>
            <div className={"filters"} >
                <label>Name</label>
                <input type="text" value={criteria.name} onChange={(e) => handleChangeCriteria({ name: e.target.value })} />
                <label>Material</label>
                <select name="materials" id="materials" value={criteria.material} onChange={(e) => handleChangeCriteria({ material: e.target.value })}>
                    <option value="" defaultValue></option>
                    {
                        materialList ? materialList.map((material, index) => {
                            return <option key={index} value={material}>{material}</option>
                        })
                            : null
                    }
                </select>
                <label>Start Date</label>
                <DatePicker selected={criteria.expiryDateOne !== "" ? moment(criteria.expiryDateOne).toDate() : moment().toDate()} onChange={date => handleChangeCriteria({ expiryDateOne: moment(date).format('YYYY-MM-DDTHH:mm:ss[Z]') })} />
                <label>End Date</label>
                <DatePicker selected={criteria.expiryDateTwo !== "" ? moment(criteria.expiryDateTwo).toDate() : moment().toDate()} onChange={date => handleChangeCriteria({ expiryDateTwo: moment(date).format('YYYY-MM-DDTHH:mm:ss[Z]') })} />

            </div>

            {showStats ?
                <div className="stats">
                    <h1>Statistics</h1>
                    <h2>% Products of each material: </h2>
                    <ul>
                        {materialList.map((material, index) => {
                            return <li key={index}>{material}: {((filteredProducts.filter(product => product.type === material).length / filteredProducts.length) * 100).toFixed(2)}</li>
                        })}
                    </ul>

                    <br />
                    <h2>Total Price : £{filteredProducts.length > 0 ? (filteredProducts.map((product) => parseFloat(product.price)).reduce((a, b) => a + b, 0)).toFixed(2) : "N/A"}</h2>
                    <br />
                    <h2>Average Price : £{filteredProducts.length > 0 ? (filteredProducts.map((product) => parseFloat(product.price)).reduce((a, b) => a + b, 0) / filteredProducts.length).toFixed(2) : "N/A"}</h2>
                </div>
                : null}

            <div className="pagination">
                <button onClick={() => page > 1 ? setPage(page - 1) : null}>Previous Page</button>
                <h4>Page {page}</h4>
                <button onClick={() => setPage(page + 1)}>Next Page</button>
            </div>

            <ul>
                {filteredProducts.length > 0 && pagination(filteredProducts, page).map((product, index) => {
                    return <li key={index}>
                        id: {product.id + " "}
                        name: {product.name + " "}
                        type: {product.type + " "}
                        price: £{product.price + " "}
                        expiry date: {moment(product.expiryDate).format('DD/MM/YYYY') + " "}
                        description: {product.description + " "}
                        country: {product.country + " "}
                        <Link to={`/addProduct/${product.id}`}>Edit Product</Link>
                        <button onClick={() => deleteProduct(product.id)}>Delete Product</button>
                        <button onClick={() => openModal({ product })}>Add to Basket</button></li>
                })}
            </ul>

            <ReactModal
                isOpen={showModal}
                contentLabel="Add items modal"
                onAfterClose={ () => addItem(itemToBasket.product, itemToBasket.amount)}
            >
                {Object.keys(itemToBasket).length > 0 ? <>
                <h2>Enter amount</h2>
                <br/>
                <label>{itemToBasket.product.name}</label>
                <input type="number" value={itemToBasket.amount} onChange={(e) => handleChangeAmount({amount: e.target.value})}/>
                <br/>
                <button onClick={() =>(setShowModal(false))}>Close Window</button> </> : null}
                
            </ReactModal>


        </div>

    );
};

export default ProductList;