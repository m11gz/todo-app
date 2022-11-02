import { useState, useEffect } from 'react';

// make form logic generic so we can use it n 
const useForm = (callback, defaultValues={}) => {

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    callback(values);
  };

  const handleChange = (event) => {
    event.persist(); // allows us to to set state values

    let { name, value } = event.target; // the input element , and slider
    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect( () => {
    setValues( defaultValues );
  }, [defaultValues]);

  // we are not returning JSX instead we return functions and values
  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
