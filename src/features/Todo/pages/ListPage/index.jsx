import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoForm from '../../components/TodoForm';

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    {
      id : 1,
      title: 'Eat',
      status: 'new'
    },
    {
      id : 1,
      title: 'Sleep',
      status: 'completed'
    },
    {
      id : 1,
      title: 'Code',
      status: 'new'
    }
  ]

  const [todoList, setTodoList] = useState(initTodoList);

  const location = useLocation(); //get url location
  const history = useHistory(); //for navigate, change
  const match = useRouteMatch(); //get path of component parent

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status || 'all');
  }, [location.search]); //change when location change

  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);

    return params.status || 'all';
  });

  const handleClickToBro = () => {
    const queryParam = { status: 'bro' };
    history.push({
      //navigate
      pathname: match.path,
      search: queryString.stringify(queryParam), //parse json obj to string query get
    });
  };

  const handleTodoFormSubmit = (values) => {
    console.log('Form submit', values);
    const newTodo = {
      id : todoList.length + 1,
      title : values.title,
      status : 'new',
    }
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div>
      <h3>What Todo</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />

      This is List page {filteredStatus}
      <button onClick={handleClickToBro}>change Status</button>
    </div>
  );
}

export default ListPage;
