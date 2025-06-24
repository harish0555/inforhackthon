import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPageComponent from './components/LandingPageComponent/LandingPageComponent'
import { Route, Router, Routes, useLocation } from 'react-router-dom'
import ChallengeDetailsComponent from './components/ChallengeDetailsComponent/ChallengeDetailsComponent'
import TutorialComponent from './components/TutorialComponent/TutorialComponent'
import ValidationComponent from './components/ValidationComponent/ValidationComponent'
// import ChallengesListComponent from './components/ChallengesListComponent/ChallengesListComponent'
// import ValidationComponent from './components/ValidationComponent/ValidationComponent'

function App() {
  const location = useLocation();

 useEffect(() => {
  const postHeighttoIframe = ()=>{
       const height = document.body.scrollHeight;
        window.parent.postMessage({ type: "SET_HEIGHT", height }, 'https://community-staging.developer.infor.com');
  };
  postHeighttoIframe();

 // Use ResizeObserver for layout changes
   const resizeObserver = new ResizeObserver(() => {
     postHeighttoIframe();
   });
   resizeObserver.observe(document.body);
   // MutationObserver for DOM changes
   const mutationObserver = new MutationObserver(() => {
     setTimeout(postHeighttoIframe, 100); // small delay ensures layout is updated
   });
   mutationObserver.observe(document.body, {
     childList: true,
     subtree: true,
     attributes: true,
   });
   // Send on mount and when route changes
   const routeTimeout = setTimeout(postHeighttoIframe, 200);
   window.addEventListener("resize", postHeighttoIframe);
   return () => {
     resizeObserver.disconnect();
     mutationObserver.disconnect();
     clearTimeout(routeTimeout);
     window.removeEventListener("resize", postHeighttoIframe);
   };
}, [location]);

  return (
    // <Router>
      <Routes>
        <Route path='/' element={<LandingPageComponent/>} />
        <Route path='/challenge/:id' element={<ChallengeDetailsComponent/>} />
        <Route path='/challenge/:id/tutorial' element={<TutorialComponent/>} />
        <Route path='/challenge/:id/validation' element={<ValidationComponent/>} />
        {/* <Route path='/challenge/:id' element={<ChallengesListComponent/>} />
        <Route path='/challengeValidation/:id' element={<ValidationComponent/>}/> */}
      </Routes>
    // </Router>
  )
}

export default App
