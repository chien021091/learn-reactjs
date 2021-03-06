import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, FormControlLabel, makeStyles, TextField, Typography } from '@material-ui/core';

FilterByService.propTypes = {
    onChange : PropTypes.func,
    filters : PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
    root : {
        padding : theme.spacing(2),
        borderTop : `1px solid ${theme.palette.grey[300]}`,
    },
    list : {
        padding : 0,
        margin : 0,
        listStyleType : 'none',

        '& > li' : {
            margin : 0,
        }
    }
}));

function FilterByService({onChange, filters = {}}) {

    const classes = useStyles();

    const handleChange = (e) => {
        const { name, checked } = e.target;

        if(onChange)    onChange({[name] : checked})
    }

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2">Dich Vu</Typography>

            <ul className={classes.list}>
                {
                    [{value : 'isPromotion', label : 'Co Khuyen mai'}, {value : 'isFreeShip', label : 'Van chuyen mien phi'}].map(service => (
                        <li key={service.value}>
                            <FormControlLabel
                            control={
                            <Checkbox
                                checked={Boolean(filters[service.value])}
                                onChange={handleChange}
                                name={service.value}
                                color="primary"
                            />
                            }
                            label={service.label}
                        />
                        </li>
                    ))
                }
            </ul>
        </Box>
    );
}

export default FilterByService;