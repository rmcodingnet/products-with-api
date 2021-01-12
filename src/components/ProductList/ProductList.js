import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const pagination = (data, page = 1, pageLimit = 50) => {
    let result = data.slice((page - 1) * pageLimit, page * pageLimit);
    return result;
}




const ProductList = ({ products }) => {
    const [page, setPage] = useState(1);
    const [criteria, setCriteria] = useState({ name: "", material: "", expiryDateOne: "", expiryDateTwo: "" })

    const history = useHistory();

    let materialList = products.length > 0 ? products.map((product) => product.type) : null;

    materialList = Array.from(new Set(materialList))



    const handleChangeCriteria = (newCriteria) => {
        setCriteria({...criteria, ...newCriteria})
        history.push({pathname:'/', search: `?name=${criteria.name}&material=${criteria.material}&expiryDateOne=${criteria.expiryDateOne}&expiryDateTwo=${criteria.expiryDateTwo}`})
    }

    const filteredProducts = products
        .filter(item => {
            if (criteria.name !== "") {
                return item.name === criteria.name
            } else { return true }
        })
        .filter(item => {
            if (criteria.material !== "") {
                return item.type === criteria.material
            } else { return true }
        })
        .filter(item => {
            if (criteria.expiryDateOne !== "") {
                return moment(item.expiryDate).isSame(criteria.expiryDate) || moment(item.expiryDate).isAfter(criteria.expiryDate)
            } else { return true }
        })
        .filter(item => {
            if (criteria.expiryDateTwo !== "") {
                return moment(item.expiryDate).isSame(criteria.expiryDate) || moment(item.expiryDate).isBefore(criteria.expiryDate)
            } else { return true }
        })
    return (
        <div>
            <div className={"filters"} >
                <label>Name</label>
                <input type="text" value={criteria.name} onChange={(e) => handleChangeCriteria({ name: e.target.value })}/>
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
                <DatePicker selected={criteria.expiryDateOne != "" ? moment(criteria.expiryDateOne).toDate() : moment().toDate()} onChange={date => handleChangeCriteria({expiryDateOne: date})}/>
                <label>End Date</label>
                <DatePicker selected={criteria.expiryDateTwo != "" ? moment(criteria.expiryDateTwo).toDate() : moment().toDate()} onChange={date => handleChangeCriteria({expiryDateTwo: moment(date).format('YYYY-MM-DDTHH:mm:ss[Z]')})}/>

            </div>
            <div className="pagination">
                <button onClick={() => page > 1 ? setPage(page - 1) : null}>Previous Page</button>
                <h4>{page}</h4>
                <button onClick={() => setPage(page + 1)}>Next Page</button>
            </div>

            <ul>
                {filteredProducts.length > 0 && pagination(filteredProducts, page).map((product, index) => {
                    return <li key={index}>id: {product.id} name: {product.name} type: {product.type} price: £{product.price} expiry date: {moment(product.expiryDate).format('DD/MM/YYYY')} description: {product.description} country: {product.country}</li>
                })}
            </ul>
        </div>

    );
};

export default ProductList;