import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { useEffect } from 'react';
import productApi from '../../../api/productApi';

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 auto',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  useEffect(()=> {
    const fetchListProduct = async () => {
        const response = await productApi.getAll({
            _page : 1,
            _limit : 10,
        });
        console.log('List cua toi', response);
    }

    fetchListProduct();
  }, []);


  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid className={classes.left} item>
            <Paper elevation={0}>Left Colum</Paper>
          </Grid>
          <Grid className={classes.right} item>
            <Paper elevation={0}>Right Column</Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
