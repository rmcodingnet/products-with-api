export const getList = () => {
    return  fetch("http://localhost:8000/api/products").then(response => response.json())
}





