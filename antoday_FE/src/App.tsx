import React from 'react';
import AppRouter from './AppRouter';
import './App.css'

const App = () => {
  console.log('여기는 렌더링 되는거지?')
  return (
    <div className="App">
    <AppRouter/>
    </div>
  );
}

export default App;
