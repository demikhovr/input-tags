import React, { forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import classes from './InputText.module.scss';

const InputText = forwardRef((props, ref) => {
  const {
    autoComplete,
    className,
    defaultValue,
    disabled,
    id,
    label,
    name,
    min,
    onBlur,
    onChange,
    onClick,
    onInput,
    onKeyDown,
    onPaste,
    placeholder,
    required,
    spellCheck,
    type,
    value,
  } = props;

  return (
    <label
      className={cn(classes.fieldText, className)}
      htmlFor={id}
    >
      {label ? (
        <span className={classes.fieldTextLabel}>
          {label}
        </span>
      ) : null}
      <input
        autoComplete={autoComplete}
        className={classes.fieldTextInput}
        defaultValue={defaultValue}
        disabled={disabled}
        id={id}
        name={name}
        min={min}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        onInput={onInput}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        placeholder={placeholder}
        ref={ref}
        required={required}
        spellCheck={spellCheck}
        type={type}
        value={value}
      />
    </label>
  );
});

InputText.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onInput: PropTypes.func,
  onPaste: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  spellCheck: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'tel', 'search', 'number', 'password']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

InputText.defaultProps = {
  autoComplete: null,
  className: '',
  disabled: false,
  defaultValue: undefined,
  id: '',
  label: '',
  name: '',
  min: null,
  onBlur: null,
  onChange: null,
  onClick: null,
  onKeyDown: null,
  onInput: null,
  onPaste: null,
  placeholder: '',
  required: false,
  spellCheck: false,
  type: 'text',
  value: undefined,
};

export default InputText;
