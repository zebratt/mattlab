import { store } from '@/store';
import React from 'react';

function HomePage() {
  return <div className="page-home">home page</div>;
}

export async function fetch() {
  store.dispatch.core.init();
}

export default HomePage;
