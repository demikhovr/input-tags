import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import ButtonRemove from '../ButtonRemove/ButtonRemove';

import classes from './Tag.module.scss';

const Tag = (props) => {
  const {
    disabled,
    index,
    isDuplicate,
    onChange,
    onDelete,
    pattern,
    value,
  } = props;

  const [error, setError] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (value && pattern) {
      setError(!value.match(pattern));
    }
  }, []);

  const handleDelete = useCallback(() => onDelete(index), [onDelete, index]);

  const update = useCallback(() => {
    const newValue = ref.current.textContent.trim();
    ref.current.contentEditable = false;

    if (newValue.length) {
      onChange(index, newValue);

      if (pattern) {
        setError(!newValue.match(pattern));
      }
    } else {
      onDelete(index);
      setError(false);
    }
  }, [index, onChange, onDelete]);

  const handleBlur = useCallback(() => update(), [update]);

  const handleDoubleClick = useCallback(() => {
    if (!ref.current || disabled) {
      return;
    }

    ref.current.contentEditable = true;
    ref.current.focus();
  }, [disabled, ref]);

  const handleKeyDown = useCallback(
    ({ key }) => key === 'Enter' && update(),
    [update],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn({
        [classes.tag]: true,
        [classes.tagError]: error || isDuplicate,
        [classes.tagDisabled]: disabled,
      })}
      onBlur={handleBlur}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      ref={ref}
      spellCheck={false}
    >
      {value}
      <ButtonRemove
        className={cn({
          [classes.tagBtnDelete]: true,
          [classes.tagBtnError]: error || isDuplicate,
        })}
        disabled={disabled}
        onClick={handleDelete}
      />
    </div>
  );
};

Tag.propTypes = {
  disabled: PropTypes.bool,
  index: PropTypes.number.isRequired,
  isDuplicate: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  pattern: PropTypes.instanceOf(RegExp),
  value: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  disabled: false,
  pattern: null,
};

export default Tag;
