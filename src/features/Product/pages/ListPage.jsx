import React, {useState} from 'react';
import PropTypes from 'prop-types';
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
    const [productList, setProductList] = useState([]);
    const [pagination, setPagination] = useState({
      limit : 9,
      count : 10,
      page : 10,
    });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
      _page : 1,
      _limit : 9,
      _sort : 'salePrice:ASC'
    });

    useEffect(() => {
        try {
            const fetchListProduct = async () => {
                const { data, pagination } = await productApi.getAll(filters);
                setProductList(data);
                setPagination(pagination);
            };

            fetchListProduct();
        } catch (error) {
          console.log('Failed to fetch product list ', error);
        } finally {
          setLoading(false);
        }
    }, [filters]);

    const handlePageChange = (e, page) => {
      setFilters(prevFilter => ({...prevFilter, _page : page}));
    }

    const handleSortChange = (newSortValue) => {
      setFilters(prevFilter => ({...prevFilter, _sort : newSortValue}));
    }

    const handleFilterChange = (newFilter) => {
      setFilters(prevFilter => ({...prevFilter, ...newFilter}));
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid className={classes.left} item>
                        <Paper elevation={0}>
                          <ProductFilters filters={filters} onChange={handleFilterChange} />
                        </Paper>
                    </Grid>
                    <Grid className={classes.right} item>
                        <Paper elevation={0}>
                          <ProductSort currentSort={filters._sort} onChange={handleSortChange} />

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
