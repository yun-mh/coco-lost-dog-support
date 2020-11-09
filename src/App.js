import React from "react";
import Routes from "./components/Routes";
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './assets/styles.css';

function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </>
  );
}

export default App;
