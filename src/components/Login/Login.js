import React, { useState, useEffect, useReducer } from 'react';

import Card from './UI/Card/Card';
import classes from './Login.module.css';
import Button from './UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPhone, setEnteredPhone] = useState('');
  const [phoneIsValid, setPhoneIsValid] = useState();

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailIsValid(event.target.value.includes('@'));
  };

  const phoneChangeHandler = (event) => {
    setEnteredPhone(event.target.value);
    setPhoneIsValid(event.target.value.trim().length > 0)
  };

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("uid", enteredPhone);
    localStorage.setItem("name", enteredEmail);
    props.onLogin(enteredPhone, enteredEmail);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            phoneIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="phone">Phone</label>
          <input
            type="phone"
            id="phone"
            value={enteredPhone}
            onChange={phoneChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!(emailIsValid && phoneIsValid)}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
