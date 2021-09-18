import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import './App.css';
import Header from './components/Header';
import Albums from './features/Albums';
import CartFeature from './features/Cart';
import Counter from './features/Counter';
import ProductFeature from './features/Product';
import Todo from './features/Todo';

function App() {
  useEffect(()=> {
    const fetchProducts = async () => {
      const params = {
        _limit : 10,
      };
      const response = await productApi.getAll(params);
      console.log(response);
    }

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Header />
      
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" exact component={Counter} />
        <Route path="/todos" component={Todo} />
        <Route path="/albums" component={Albums} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
        {/* <Route component={NotFound} /> */}
      </Switch>
      Footer
    </div>
  );
}

export default App;
