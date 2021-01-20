import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import UpsertProduct from './components/UpsertProduct/UpsertProduct';
import Basket from './components/Basket/Basket';
import Navbar from './components/Navbar/Navbar';
import { getList, deleteProduct } from './api/ProductsAPI';


function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([])

  useEffect(() => {
      getList().then(result => setProducts(result))
      if(basket.length < 1 && localStorage.getItem('basket')) {
        if(JSON.parse(localStorage.getItem('basket')).length > 1 ){
          setBasket(JSON.parse(localStorage.getItem('basket')));
        }
      } else if (basket.length >= 1){
        localStorage.setItem('basket', JSON.stringify(basket))
      }
  }, [basket])

  const refreshProductList = () => {
    getList().then(result => setProducts(result))
  }

  const addToBasket = (product, amount) => {
    const newBasketItem = {
      ...product,
      amount
    }

    basket.push(newBasketItem);
    setBasket(basket);
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  const updateBasket = (itemID, newAmount) => {
    const itemToUpdate = basket.findIndex(item => item.id === itemID);
    setBasket((prevState) => 
      prevState.map((actualProduct, i) => {
        if (i === itemToUpdate) {
          return { ...actualProduct, "amount": newAmount.amount}
        }
        return actualProduct
      }))
    localStorage.setItem('basket', JSON.stringify(basket));
  }

  const removeFromBasket = (itemID) => {
    const itemToRemove = basket.findIndex(item => item.id === itemID)
    console.log(itemToRemove)
    setBasket(basket.filter((item) => {
       return item.id !== itemID
    }));
    //basketItems.splice(itemToRemove, 1);
    
    ////localStorage.setItem('basket', JSON.stringify(basketItems))
    // console.log(basketItems);
    localStorage.removeItem('basket')
  }

  // const addNewProduct = (product) => {
  //   addProduct(product).then(result =>  {
  //     getList().then(result => setProducts(result));
  //     return result.newID ? alert("New Product Added") : alert("Error adding new product");
  //   });
  // }

  // const updateExistingProduct = (id, product) => {
  //   console.log(id)
  //   console.dir(product)
  //   updateProduct(id, product).then(result => {
  //     getList().then(result => setProducts(result));
  //     return result.ok ? alert("Product Updated") : alert("An Error Occured");
  //   });
  // }

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
              refresh={refreshProductList}
              products={products}
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path="/checkout"
          render={(props) => (
            <Basket
              basket={basket} 
              updateItem={updateBasket}
              removeItem={removeFromBasket}
              {...props}/>
          )}
        />
        <Route
          exact={true}
          path="/"
          render={(props) => (
            <ProductList 
              addItem={addToBasket}
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
