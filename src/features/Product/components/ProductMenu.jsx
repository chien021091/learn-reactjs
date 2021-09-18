import { Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {
    
};

const useStyles = makeStyles((theme) => ({
    root : {
        display : 'flex',
        flexFlow : 'row nowrap',
        justifyContent : 'center',
        alignItems : 'center',

        padding : 0,
        listStyleType : 'none',

        '& > li' : {
            padding : '16px 32px',
        },

        '& > li >  a' : {
            // color : theme.palette.grey[700],
        },

        '& > li >  a.active' : {
            // color : theme.palette.primary.main,
            textDecoration : 'underline'
        }
    }
}));

function ProductMenu(props) {

    const { url } = useRouteMatch();
    const classes = useStyles();

    return (
        <Box component="ul" className={classes.root}>
            <li>
                <Link component={NavLink} to={url}>Description</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/additional`}>Addition Information</Link>
            </li>
            <li>
                <Link component={NavLink} to={`${url}/review`}>Review</Link>
            </li>
        </Box>
    );
}

export default ProductMenu;