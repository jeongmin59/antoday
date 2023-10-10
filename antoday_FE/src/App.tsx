import React from 'react';
import AppRouter from './AppRouter';
import './App.css'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App : React.FC = () => {
  
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppRouter/>
      </div>
      </QueryClientProvider>
    </RecoilRoot>
    
  );
}

export default App;
