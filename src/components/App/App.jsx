import React from 'react';

import InputTags from '../InputTags/InputTags';
import classes from './App.module.scss';
import { Regex } from '../constants';

const App = () => (
  <>
    <InputTags
      className={classes.input}
      onChange={console.log}
      placeholder="type here..."
      type="text"
    />
    <InputTags
      className={classes.input}
      onChange={console.log}
      placeholder="type email here...  [e.g. name.surname@gmail.com]"
      pattern={Regex.EMAIL}
      type="email"
    />
  </>
);

export default App;
