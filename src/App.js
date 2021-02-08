import logo from './logo.svg';
import './App.css';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Todo from './features/Todo';
import Albums from './features/Albums';
import NotFound from './components/NotFound';
import { useEffect } from 'react';
import productApi from './api/productApi';
import Counter from './features/Counter';
import Header from './components/Header';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

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
      HomePage
      
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" exact component={Counter} />
        <Route path="/todos" component={Todo} />
        <Route path="/albums" component={Albums} />
        {/* <Route component={NotFound} /> */}
      </Switch>
      Footer
    </div>
  );
}

export default App;
