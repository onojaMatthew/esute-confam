import React from 'react';
import { BrowserRouter } from "react-router-dom";
import MainRoute from './MainRoute';

const App = () => (
  <BrowserRouter>
    <MainRoute />
  </BrowserRouter>
)

export default App;