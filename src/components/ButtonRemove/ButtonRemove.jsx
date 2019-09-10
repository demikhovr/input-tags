import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import classes from './ButtonRemove.module.scss';

const ButtonRemove = (props) => {
  const {
    className,
    children,
    disabled,
    onClick,
    title,
  } = props;

  return (
    <button
      className={cn(classes.buttonRemove, className)}
      disabled={disabled}
      onClick={onClick}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
};

ButtonRemove.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ButtonRemove.defaultProps = {
  className: null,
  children: null,
  disabled: false,
  title: null,
};

export default ButtonRemove;
