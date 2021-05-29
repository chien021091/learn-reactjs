import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import categoryApi from '../../../../api/categoryApi';
import ListCategory from './ListCategory';
import ListCategorySkeleton from './ListCategorySkeleton';

FilterByCategory.propTypes = {
    onChange: PropTypes.func
};

function FilterByCategory({onChange}) {

    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const list = await categoryApi.getAll();
                setCategoryList(list.map(cat => ({id: cat.id, name: cat.name})));
            } catch (error) {
                console.log('Failed to fetch category List ', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    return (<div> {
        loading ? <ListCategorySkeleton length={6}/> : <ListCategory categoryList={categoryList}
            onChange={onChange}/>
    } </div>);
}

export default FilterByCategory;
