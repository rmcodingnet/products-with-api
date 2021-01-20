import React, { useEffect, useState } from 'react';
import { withRouter, useParams, Redirect } from 'react-router-dom';
import moment from 'moment';
import { addProduct, updateProduct } from '../../api/ProductsAPI';
import './UpsertProduct.css'

const UpsertProduct = ({ products, refresh }) => {
    const [values, setValues] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [formErrors, setFormErrors] = useState({})

    const { productID } = useParams();


    const product = products.length > 0 && products.find(item => item.id === parseInt(productID));

    useEffect(() => {
        if (product) {
            setValues({ ...product, expiryDate: moment(product.expiryDate).format('YYYY-MM-DD') })
        }

    }, [product])


    const addNewProduct = (product) => {
        addProduct(product).then(result => {
            if (result.newID) {
                alert("New Product Added");
                refresh();
                setRedirect(true);
            } else {
                return alert("Error adding new product")
            }
        });
    }


    const updateExistingProduct = (id, product) => {
        updateProduct(id, product).then(result => {
            if(result.ok) {
                alert("Product Updated")
                refresh();
                setRedirect(true);
            }
            return result.ok ? alert("Product Updated") : alert("An Error Occured");
        });
    }


    const handleChangeValues = (newValue) => {
        setValues({ ...values, ...newValue });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name: values.name,
            type: values.type,
            price: values.price,
            expiryDate: values.expiryDate,
            description: values.description,
            country: values.country
        }
        console.log(newProduct)
        product ? updateExistingProduct(product.id, newProduct) : addNewProduct(newProduct);
    }

    if (redirect) {
        return <Redirect to=""></Redirect>
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label>Name</label>
                <input required type="text" value={values.name || ""} onChange={(e) => handleChangeValues({ name: e.target.value })} />
                <br />
                <label>Material</label>
                <input required type="text" value={values.type || ""} onChange={(e) => handleChangeValues({ type: e.target.value })} />
                <br />
                <label>Price (£)</label>
                <input required type="number" value={values.price || ""} onChange={(e) => handleChangeValues({ price: e.target.value })} />
                <br />
                <label>Expiry Date</label>
                <input required type="date" value={values.expiryDate || ""} onChange={(e) => handleChangeValues({ expiryDate: e.target.value })} />
                {/* <DatePicker selected={values.expiryDate !== "" ? moment(values.expiryDate).toDate() : moment().toDate()} onChange={date => handleChangeValues({ expiryDate: moment(date).format('YYYY-MM-DDTHH:mm:ss[Z]') })} /> */}
                <br />
                <label>Description</label>
                <textarea required type="text" value={values.description || ""} onChange={(e) => handleChangeValues({ description: e.target.value })} />
                <br />
                <label>Country</label>
                <input required type="text" value={values.country || ""} onChange={(e) => handleChangeValues({ country: e.target.value })}></input>
                <br />
                {product ? <button type="submitBtn">Update Product</button> : <button type="submit" className="submitBtn">Add Product</button>}
            </form>
        </div>
    );
};

export default withRouter(UpsertProduct);