import logo from './assets/logo.svg';
import './App.scss';
import { ReactComponent as Logo } from './assets/logo.svg';
import { store, persistor } from './configs/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Planets from './components/Planets/planets';
import Planet from './components/Planet/planet';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div className="App">
            <header>
              <Logo className='logo'/>
            </header>
              <Switch>
                <Route path="/planets">
                  <Planets/>
                </Route>
                <Route path="/planet">
                  <Planet/>
                </Route>
              </Switch>
            </div>
          </Router>
        </PersistGate>
    </Provider>
  );
}

export default App;
