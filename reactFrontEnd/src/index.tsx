import './index.css';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/reduxIndex';



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>

  , document.getElementById('root'));

