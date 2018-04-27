import React from 'react';
import ReactDOM from 'react-dom';

import Boilerplate from 'app/boilerplate';
import 'app/styles.css';

ReactDOM.render(<Boilerplate />, document.getElementById('app'));

module.hot.accept();
