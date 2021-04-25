import React from 'react';
import ReactDOM from 'react-dom';

import '@/styles/index.less'

export function bootstrap(element: React.ReactElement) {
  ReactDOM.render(element, document.getElementById('root'));
}