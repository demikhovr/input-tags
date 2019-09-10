import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import InputText from '../InputText/InputText';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Tag from '../Tag/Tag';

import { Regex } from '../constants.js';

import classes from './InputTags.module.scss';

const KEYS = ['Enter', 'Tab', ','];

const InputTags = (props) => {
  const {
    className,
    disabled,
    id,
    inputClassName,
    name,
    onChange,
    pattern,
    placeholder,
    type,
    value,
  } = props;

  const [_value, setValue] = useState(value || '');
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);

  const checkValidity = useCallback((inputValue) => {
    let _error = null;

    if (tags.includes(inputValue)) {
      _error = `'${inputValue}' has already been added!`;
    }

    if (pattern && !pattern.test(inputValue)) {
      _error = `'${inputValue}' is not a valid value!`;
    }

    if (_error) {
      setError(_error);
      return false;
    }

    return true;
  }, [tags, pattern]);

  const update = useCallback((inputValue) => {
    if (inputValue.length && checkValidity(inputValue)) {
      const updatedTags = [...tags, inputValue];
      setTags(updatedTags);
      onChange(name, updatedTags);
      setValue('');
    }
  }, [tags]);

  const handleBlur = useCallback(({ target }) => {
    const inputValue = target.value.trim();
    update(inputValue);
  }, [tags]);

  const handleChange = useCallback(({ target }) => {
    setValue(target.value);
    setError(null);
  }, []);

  const handleKeyDown = useCallback((evt) => {
    if (KEYS.includes(evt.key)) {
      evt.preventDefault();
      const inputValue = evt.target.value.trim();
      update(inputValue);
    }
  }, [tags]);

  const handlePaste = useCallback((evt) => {
    evt.preventDefault();
    const paste = evt.clipboardData.getData('text');
    const values = pattern ? paste.match(pattern).slice(0, 1) : paste.split(Regex.PASTE_SEPARATORS);

    if (values) {
      const toBeAdded = values.filter(it => it && !tags.includes(it));
      const updatedTags = [...tags, ...toBeAdded];
      setTags(updatedTags);
      onChange(name, updatedTags);
    }
  }, [tags]);

  const handleTagChange = useCallback((index, newValue) => {
    const updatedTags = tags.map((it, i) => (i === index ? newValue : it));
    setTags(updatedTags);
    onChange(name, updatedTags);
  }, [tags]);

  const handleDelete = useCallback((index) => {
    const updatedTags = tags.filter((it, i) => i !== index);
    setTags(updatedTags);
    onChange(name, updatedTags);
  }, [tags]);

  return (
    <div className={cn(classes.inputTags, className)}>
      <InputText
        className={cn({
          [classes.inputTagsInput]: true,
          [classes.inputTagsInputError]: error,
          inputClassName,
        })}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        type={type}
        value={_value}
      />
      {error && (
        <ErrorMessage className={classes.inputTagsError}>
          {error}
        </ErrorMessage>
      )}
      {tags.length ? (
        <div className={classes.inputTagsOutput}>
          {tags.map((it, index) => {
            const key = `${it}-${index}`;

            return (
              <Tag
                disabled={disabled}
                index={index}
                isDuplicate={tags.filter(tag => tag === it).length > 1}
                key={key}
                onChange={handleTagChange}
                onDelete={handleDelete}
                pattern={pattern}
                value={it}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

InputTags.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputClassName: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.instanceOf(RegExp),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

InputTags.defaultProps = {
  className: null,
  disabled: false,
  id: '',
  inputClassName: null,
  name: '',
  pattern: null,
  placeholder: null,
  type: 'text',
  value: '',
};

export default InputTags;
