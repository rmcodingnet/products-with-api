import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import UpsertProduct from './components/UpsertProduct/UpsertProduct';
import Basket from './components/Basket/Basket';
import Navbar from './components/Navbar/Navbar';
import { getList, addProduct, updateProduct } from './api/ProductsAPI';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      getList().then(result => setProducts(result))
  }, [])


  const addNewProduct = (product) => {
    addProduct(product).then(result =>  {
      getList().then(result => setProducts(result));
      return result.newID ? alert("New Product Added") : alert("Error adding new product");
    });
  }

  const updateExistingProduct = (id, product) => {
    console.log(id)
    console.dir(product)
    updateProduct(id, product).then(result => {
      getList().then(result => setProducts(result));
      return result.hasOwnProperty('name') ? alert("Updated Sucessfully") : alert("Error updating product");
    });
  }

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route
          exact={true}
          path="/addProduct/:productID?"
          render={(props) => (
            <UpsertProduct 
              addProduct={addNewProduct}
              updateProduct={updateExistingProduct}
              products={products}
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path="/checkout"
          render={(props) => (
            <Basket />
          )}
        />
        <Route
          exact={true}
          path="/"
          render={(props) => (
            <ProductList 
              products={products}
              {...props}
              />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
