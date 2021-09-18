import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReview from '../components/ProductReview';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hook/useProductDetail';
import { useDispatch } from 'react-redux';
import { addToCard } from '../../../features/Cart/cartSlice'

DetailPage.propTypes = {
    
};

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom : theme.spacing(3),
    },
    left: {
        width: '400px',
        padding : theme.spacing(1.5),
        borderRight : `1px solid ${theme.palette.grey[300]}`,
    },
    right: {
        flex: '1 1 0',
        padding : theme.spacing(1.5),
    },
    loading : {
        position : 'fixed',
        top : 0,
        left : 0,
        width : '100%'
    }
}));

function DetailPage(props) {

    const classes = useStyles();
    const {params : { productId }, url} = useRouteMatch();
    const { product, loading } = useProductDetail(productId);

    const dispatch = useDispatch();

    if(loading){
        return <Box className={classes.loading}>
            <LinearProgress />
        </Box>
    }

    const handleAddToCartSubmmit = ({ quantity }) => {
        const action = addToCard({
            id : product.id,
            product,
            quantity
        });
        console.log('action', action);
        dispatch(action);
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCartSubmmit} />
                        </Grid>
                    </Grid>
                </Paper>

                <ProductMenu />

                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product} />
                    </Route>
                    <Route exact path={`${url}/additional`} component={ProductAdditional} />
                    <Route exact path={`${url}/review`} component={ProductReview} />
                </Switch>
            </Container>
        </Box>
    );
}

export default DetailPage;