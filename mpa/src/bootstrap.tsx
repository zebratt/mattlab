import React from 'react';
import ReactDOM from 'react-dom';

export function bootstrap(element: React.ReactElement) {
  ReactDOM.render(element, document.getElementById('root'));
}