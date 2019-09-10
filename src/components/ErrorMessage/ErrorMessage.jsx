import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import classes from './ErrorMessage.module.scss';

const ErrorMessage = (props) => {
  const { children, className } = props;

  return (
    <div className={cn(classes.errorMessage, className)}>
      {children}
    </div>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

ErrorMessage.defaultProps = {
  className: null,
};

export default ErrorMessage;
