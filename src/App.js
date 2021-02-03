import logo from './logo.svg';
import './App.css';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Todo from './features/Todo';
import Albums from './features/Albums';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      HomePage
      <p>
        <NavLink to="/todos">Todos</NavLink>
      </p>
      <p>
        <NavLink to="/albums">Albums</NavLink>
      </p>
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/posts/:postId" exact />

        <Route path="/" exact component={Todo} />
        <Route path="/todos" component={Todo} />
        <Route path="/albums" component={Albums} />
        <Route component={NotFound} />
      </Switch>
      Footer
    </div>
  );
}

export default App;
