import React, { useState } from "react";
import "./App.css";
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import LandingPage from "./components/LandingPage";

const OKTO_CLIENT_API_KEY = process.env.REACT_APP_OKTO_CLIENT_API_KEY;

function App() {
  console.log('App component rendered');
  const [authToken, setAuthToken] = useState(null);
  
  const handleLogout = () => {
     console.log("setting auth token to null")
     setAuthToken(null); // Clear the authToken
  };

  return (
    <Router>
     <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <Routes>
         <Route path="/" element={<LoginPage setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout}/>} />
         <Route path="/home" element={authToken ? <LandingPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />
       </Routes>
     </OktoProvider>
   </Router>
  );
}

export default App;