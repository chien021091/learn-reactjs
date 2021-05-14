import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';

ListCategory.propTypes = {
    categoryList : PropTypes.array,
    onChange : PropTypes.func,
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

            '&:hover' : {
                color : theme.palette.primary.dark,
                cursor : 'pointer',
            }
        }
    }
}));

function ListCategory({categoryList, onChange}) {

    const classes = useStyles();

    const handleCategoryClick = (category) => {
        if(onChange)    onChange(category.id);
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Danh muc san pham</Typography>
            <ul className={classes.menu}>
                {
                    categoryList.map((category, index) => (
                        <li key={category.id} onClick={() => handleCategoryClick(category)}>
                            <Typography variant="body2">{category.name}</Typography>
                        </li>
                    ))
                }
            </ul>
        </Box>
    );
}

export default ListCategory;