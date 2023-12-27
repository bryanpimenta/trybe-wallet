import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import './styles/Login.css';
import './styles/Wallet.css';
import './styles/Table.css';
import './styles/WalletForm.css';
import './styles/Header.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <HashRouter>
      <Provider store={ store }>
        <App />
      </Provider>
      ,
    </HashRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
