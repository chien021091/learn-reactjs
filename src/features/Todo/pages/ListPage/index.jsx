import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

ListPage.propTypes = {};

function ListPage(props) {
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
  return (
    <div>
      This is List page {filteredStatus}
      <button onClick={handleClickToBro}>change Status</button>
    </div>
  );
}

export default ListPage;
