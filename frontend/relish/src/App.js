import logo from './logo.svg';
import './App.css';
import Metaphoto from './features/Metaphoto/Metaphoto';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    
    <Provider store={store}>
      <Metaphoto />
    </Provider>
    
  );
}

export default App;
