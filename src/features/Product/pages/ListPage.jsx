import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {
    Box,
    Container,
    Grid,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import {useEffect} from 'react';
import productApi from '../../../api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import FilterViewer from '../components/FilterViewer';
import { useHistory, useLocation } from 'react-router';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
    root: {},
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0'
    },
    pagination : {
      display : 'flex',
      flexFlow : 'row nowrap',
      justifyContent : 'center',

      marginTop : '20px',
      paddingBottom : '10px',
    }
}));

function ListPage(props) {
    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();
    //localtion change, return new object location, not replace history by location in useEffet
    const queryParam = useMemo(() => {
      const params = queryString.parse(location.search);

      return {
        ...params,
        _page : Number.parseInt(params._page) || 1,
        _limit : Number.parseInt(params._limit) || 9,
        _sort : params._sort || 'salePrice:ASC',
        isPromotion : params.isPromotion === 'true',
        isFreeShip : params.isFreeShip === 'true',
      }
    }, [location.search]);

    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
      limit : 9,
      count : 10,
      page : 10,
    });
    const [loading, setLoading] = useState(true);
    // const [filters, setFilters] = useState(() => ({
    //   //set state one time
    //   _page : 1,
    //   _limit : 9,
    //   _sort : 'salePrice:ASC',
    //   ...queryParam,
    // }));

    // useEffect(() => {
    //   history.push({
    //     pathname : history.location.pathname,
    //     search : queryString.stringify(filters),
    //   });

    // }, [filters, history]);

    useEffect(() => {
        try {
            const fetchListProduct = async () => {
                const { data, pagination } = await productApi.getAll(queryParam);
                setProductList(data);
                setPagination(pagination);
            };

            fetchListProduct();
        } catch (error) {
          console.log('Failed to fetch product list ', error);
        } finally {
          setLoading(false);
        }
    }, [queryParam]);

    const handlePageChange = (e, page) => {
      //setFilters(prevFilter => ({...prevFilter, _page : page}));

      const filters = {...queryParam, _page : page};

      history.push({
        pathname : history.location.pathname,
        search : queryString.stringify(filters),
      });

    }

    const handleSortChange = (newSortValue) => {
      //setFilters(prevFilter => ({...prevFilter, _sort : newSortValue}));

      const filters = {...queryParam, _sort : newSortValue};

      history.push({
        pathname : history.location.pathname,
        search : queryString.stringify(filters),
      });
    }

    const handleFilterChange = (newFilter) => {
      //setFilters(prevFilter => ({...prevFilter, ...newFilter}));

      const filters = {...queryParam, ...newFilter};

      history.push({
        pathname : history.location.pathname,
        search : queryString.stringify(filters),
      });
    }

    const setNewFeature = (newFilters) => {
      //setFilters(newFilters);
      history.push({
        pathname : history.location.pathname,
        search : queryString.stringify(newFilters),
      });
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid className={classes.left} item>
                        <Paper elevation={0}>
                          <ProductFilters filters={queryParam} onChange={handleFilterChange} />
                        </Paper>
                    </Grid>
                    <Grid className={classes.right} item>
                        <Paper elevation={0}>
                          <ProductSort currentSort={queryParam._sort} onChange={handleSortChange} />

                          <FilterViewer filters={queryParam} onChange={setNewFeature} />

                          {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

                          <Box className={classes.pagination} >
                            <Pagination 
                              color="primary" 
                              count={Math.ceil(pagination.total / pagination.limit)} 
                              page={pagination.page}
                              onChange={handlePageChange}
                            >
                            </Pagination>
                          </Box>
                          
                        </Paper>
                        
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
