export const getList = () => {
    return fetch("http://localhost:8000/api/products").then(response => response.json())
}

export const addProduct = (product) => {
    return fetch("http://localhost:8000/api/products", {
        method: 'post',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}



