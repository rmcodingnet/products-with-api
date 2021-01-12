import React, { useState } from 'react';
import { Link, useHistory, useLocation} from 'react-router-dom';
import moment from 'moment';

const pagination = (data, page = 1, pageLimit = 50) => {
    let result = data.slice((page - 1) * pageLimit, page * pageLimit);
    return result; 
}


const ProductList = ({ products }) => {
    const [page, setPage] = useState(1);
    const [criteria, setCriteria ] = useState({name: "", material: "", expiryDateOne: "", expiryDateTwo: ""})
    
    return (
        <div>
            <div className={"filters"} /> 
            <div className="pagination">
                <button onClick={() => page > 1 ? setPage(page -1 ) : null}>Previous Page</button>
                <h4>{page}</h4>
                <button onClick={() => setPage(page + 1)}>Next Page</button>
            </div>

            <ul>
                {products.length > 0 && pagination(products, page).map((product, index) => {
                   return <li key={index}>id:{product.id} name:{product.name} type:{product.type} price:£{product.price} expiry date: {moment(product.expiryDate).format('DD/MM/YYYY')} description: {product.description} country: {product.country}</li>
                })}
            </ul>
        </div>
        
    );
};

export default ProductList;