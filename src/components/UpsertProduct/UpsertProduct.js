import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const UpsertProduct = ({addProduct, updateProduct, history, products}) => {
    const [values, setValues] = useState({});

    const { productID } = useParams();
    

    const product = products.length > 0 && products.find(item => item.id === parseInt(productID));

    useEffect(() => {
        if(product) {
            setValues({...product})
        }
        
    },[product])

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
        product ? updateProduct(product.id,newProduct) : addProduct(newProduct);
        history.push('/');
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <label>Name</label>
                <input required type="text" value={values.name || ""} onChange={(e) => handleChangeValues({ name : e.target.value})}/>
                <br/>
                <label>Material</label>
                <input required type="text" value={values.type || ""} onChange={(e) => handleChangeValues({ type : e.target.value})}/>
                <br/>
                <label>Price (£)</label>
                <input required type="number" value={values.price || ""} onChange={(e) => handleChangeValues({ price : e.target.value})}/>
                <br/>
                <label>Expiry Date</label>
                <DatePicker selected={values.expiryDate !== "" ? moment(values.expiryDate).toDate() : moment().toDate()} onChange={date => handleChangeValues({ expiryDate: moment(date).format('YYYY-MM-DDTHH:mm:ss[Z]') })} />
                <br/>
                <label>Description</label>
                <textarea required type="text" value={values.description || ""} onChange={(e) => handleChangeValues({ description : e.target.value})}/>
                <br/>
                <label>Country</label>
                <input required type="text" value={values.country || ""} onChange={(e) => handleChangeValues({ country : e.target.value})}></input>
                <br/>
                {product ? <button type="submitBtn">Update Product</button> : <button type="submit" className="submitBtn">Add Product</button> }
            </form>
        </div>
    );
};

export default withRouter(UpsertProduct);