import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import UpsertProduct from './components/UpsertProduct/UpsertProduct';
import Basket from './components/Basket/Basket';
import Navbar from './components/Navbar/Navbar';
import { getList, addProduct, updateProduct, deleteProduct } from './api/ProductsAPI';


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
      return result.ok ? alert("Product Updated") : alert("An Error Occured");
    });
  }

  const deleteExistingProduct = (id) => {
    deleteProduct(id).then(result => {
      getList().then(result => setProducts(result));
      console.dir(result)
      return result.ok ? alert("Product Deleted")  : alert("An Error Occured");
    })
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
              deleteProduct={deleteExistingProduct}
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
