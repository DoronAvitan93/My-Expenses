
import { useSelector } from 'react-redux';
import Expenses from './components/Expenses/Expenses';
import Register_Login from './components/Register_Login/Register_Login';
import { RootState } from './store/reduxIndex';
import Footer from './footer/Footer';


function App() {


  const isAuth = useSelector<RootState>(state => state.authRedux.isAuthenticated);



  return (
    <div>
      {!isAuth && <Register_Login />}
      {isAuth && <Expenses />}
      <Footer />
    </div>
  );
}

export default App;
