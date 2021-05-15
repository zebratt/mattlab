//@ts-nocheck
import { bootstrap } from '@/bootstrap';
import React from 'react';

function MiscPage() {
  return React.createElement('div', { className: 'page-misc' }, 'misc page');
}

bootstrap(React.createElement(MiscPage, null, null));
