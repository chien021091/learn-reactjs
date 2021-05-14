import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

ListCategorySkeleton.propTypes = {
    length : PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
    root : {
        padding : theme.spacing(2),
    },

    menu : {
        padding: 0,
        margin : 0,
        listStyleType : 'none',

        '& > li' : {
            marginTop : theme.spacing(1),
            transition : 'all .25s',
        }
    }
}));

function ListCategorySkeleton({length}) {

    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Danh muc san pham</Typography>
            <ul className={classes.menu}>
                {
                    Array.from(new Array(length)).map((x, index)=>(
                        <li key={index}>
                            <Skeleton />
                        </li>         
                    ))
                }
            </ul>
        </Box>
    );
}

export default ListCategorySkeleton;