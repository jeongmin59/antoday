import React from 'react';
import AppRouter from './AppRouter';
import './App.css'
import { RecoilRoot } from 'recoil'

const App : React.FC = () => {
  
  return (
    <RecoilRoot>
      <div className="App">
        <AppRouter/>
      </div>
    </RecoilRoot>
    
  );
}

export default App;
