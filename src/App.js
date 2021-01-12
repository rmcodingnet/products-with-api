import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import UpsertProduct from './components/UpsertProduct/UpsertProduct';
import Basket from './components/Basket/Basket';
import Navbar from './components/Navbar/Navbar';
import { getList } from './api/ProductsAPI';


function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      getList().then(result => setProducts(result))
  }, [])

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route
          exact={true}
          path="/addProduct"
          render={(props) => (
            <UpsertProduct />
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
              {...props}/>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
