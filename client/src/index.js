import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
// import { configure } from 'mobx';
import ProductStore from './store/index'


const Product = new ProductStore();

ReactDOM.render(
    <BrowserRouter>
      <Provider store={Product}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );