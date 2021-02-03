import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import NotFound from '../../components/NotFound';

Todo.propTypes = {
    
};

function Todo(props) {
    const { path } = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={ path } component={ListPage} exact />
                <Route path={`${path}/:todoId`} component={DetailPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default Todo;