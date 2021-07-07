import 'normalize.css';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import PageLoading from '@/components/page-loading';
import ErrorBoundary from '@/components/error-boundary';
import PageError from '@/components/page-error';
import Scaffold from '@/components/scaffold';
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
