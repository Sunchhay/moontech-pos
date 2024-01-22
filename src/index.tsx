import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Provider } from 'react-redux';
import { store } from './redux';
import AuthProvider from './utils/context/AuthProvider';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
          <Toaster position='top-right' duration={2500} />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);