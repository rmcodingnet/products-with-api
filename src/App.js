import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import UpsertProduct from './components/UpsertProduct/UpsertProduct';
import Basket from './components/Basket/Basket';
import Navbar from './components/Navbar/Navbar';
import { getList, addProduct } from './api/ProductsAPI';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      getList().then(result => setProducts(result))
  }, [])


  const addNewProduct = (product) => {
    addProduct(product).then(result =>  {
      getList().then(result => setProducts(result))
      return result.newID ? alert("New Product Added") : alert("Error adding new product");
    });
  }

  const updateProduct = (id, product) => {
    alert("in updateProduct function");
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
              updateProduct={updateProduct}
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
