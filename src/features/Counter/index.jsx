import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './counterSlice';
import styles from './styles.module.css';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 32,
    padding: '0 30px',
  },
});

Counter.propTypes = {};

function Counter(props) {
  const classes = useStyles();

  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleIncreaClick = () => {
    const action = increment();
    console.log(action);
    dispatch(action);
  };

  const handleDecreaClick = () => {
    const action = decrement();
    console.log(action);
    dispatch(action);
  };

  return (
    <div className={styles.counter}>
      Counter Feature {counter}
      <div>
        <Button className={classes.root} onClick={handleIncreaClick}>
          Increa
        </Button>
        <Button className={classes.root} onClick={handleDecreaClick}>
          Decrea
        </Button>
      </div>
    </div>
  );
}

export default Counter;
