import { useState, useRef } from 'react';

export const validation = () => {
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const emailInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);
  const [validationFocus, setValidationFocus] = useState('none');

  const validateEmail = (value: string) => {
    setIsEmailValid(false);
    if (value === '') return;
    validateEmailReg(value) !== null ? setIsEmailValid(true) : setIsEmailValid(false);
  };

  const validateEmailReg = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validatePassword = (value: string) => {
    setIsPasswordValid(false);
    if (value === '') return;
    value.length < 20 ? setIsPasswordValid(true) : setIsPasswordValid(false);
  };

  const markEmailTouched = () => {
    setIsEmailTouched(true);
  };

  const markPasswordTouched = () => {
    setIsPasswordTouched(true);
  }

  return { isEmailTouched, isEmailValid, validateEmail, markEmailTouched, emailInputRef, isPasswordValid, validatePassword, markPasswordTouched, isPasswordTouched, passwordInputRef, validationFocus, setValidationFocus};
};