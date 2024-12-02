import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Home from "./components/Home";
import RawTxnPage from "./components/RawTxnPage";
import WidgetPage from "./components/WidgetPage";
import Main from "./components/Main";


const OKTO_CLIENT_API_KEY = process.env.REACT_APP_OKTO_CLIENT_API_KEY;

function App() {
  console.log('App component rendered');
  const [authToken, setAuthToken] = useState(null);
  
  const handleLogout = () => {
     console.log("setting auth token to null")
     setAuthToken(null); // Clear the authToken
  };

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <Router>
     <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <Routes>
         <Route path="/" element={<LoginPage setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout}/>} />
         <Route path="/home" element={authToken ? <Main authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />
         {/* <Route path="/home" element={authToken ? <Home authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />
         <Route path="/raw" element={authToken ? <RawTxnPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />
         <Route path="/widget" element={authToken ? <WidgetPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} /> */}
       </Routes>
     </OktoProvider>
   </Router>
  );
}

export default App;