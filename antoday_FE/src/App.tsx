import React from 'react';
import AppRouter from './AppRouter';

// 페이지 컴포넌트
const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;

function App() {
  return (
    <div className="App">
    <AppRouter/>
    </div>
  );
}

export default App;
