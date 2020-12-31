import React from 'react'
import classes from './Input.css'

const input = (props) => {
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }
  let inputElement = null
  // eslint-disable-next-line default-case
  switch (props.elementtype) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
                  <option key={option.value} value={option.value}>
                      {option.displayValue}
                    </option>
                ))}
        </select>
      )
      break
    case 'default':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          onChange={props.changed}
        />
      )
  }
  
  let valiationError = null;
  if(props.touched && props.invalid) {
    valiationError =<p className={classes.ValidationError}>Please enter valid {props.label}</p>
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {valiationError}
    </div>
  )
}

export default input
