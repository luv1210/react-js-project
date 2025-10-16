import React from 'react';
import News from './Components/news';
import Header from './Components/header/header';
import Footer from './Components/Footer/Footer';
// import { Pagination } from 'react-bootstrap';



const App = () => {
  return (
    <div>
      <Header/>
      <News />
      <paginationBasic/>
      <Footer/>
    </div>
  );
};

export default App;
