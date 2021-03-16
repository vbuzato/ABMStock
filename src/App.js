import './App.css';
import { Route, Switch } from 'react-router-dom';
import Stock from './pages/Stock';
import FormStock from './pages/FormStock';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Stock} />
      <Route path="/item/:id" component={FormStock} />
      <Route path="/item" component={FormStock} />
    </Switch>
  );
}

export default App;
