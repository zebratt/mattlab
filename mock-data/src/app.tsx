import 'normalize.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import PageLoading from '@/components/PageLoading';
import ErrorBoundary from '@/components/ErrorBoundary';
import PageError from '@/components/PageError';
import Scaffold from '@/components/Scaffold';
import { store } from './store';

function App() {
  return (
    <React.StrictMode>
      <Suspense fallback={<PageLoading />}>
        <ErrorBoundary fallback={<PageError />}>
          <Provider store={store}>
            <Scaffold />
          </Provider>
        </ErrorBoundary>
      </Suspense>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
