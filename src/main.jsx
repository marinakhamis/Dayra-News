import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './routes/index.jsx';
//redux
import { Provider } from "react-redux";
import { Store } from "./store/store.js";

//stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "antd/dist/reset.css";
import "./sass/main.scss";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router />
    </Provider>
  </React.StrictMode>,
)
