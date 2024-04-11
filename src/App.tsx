import React from 'react';
import './App.css';
import MenuNavigation from './components/MenuNavigation/MenuNavigation';
import NavigationRouter from './components/NavigationRouter/NavigationRouter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
     <MenuNavigation />
     <NavigationRouter />
     </BrowserRouter>
     </Provider>
    </div>
  );
}

export default App;
