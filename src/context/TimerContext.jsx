import { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();
export const TimerProvider = ({ children }) => {
 const [time, setTime] = useState(0);
 const [timeRunning, setTimeRunning] = useState(false);
 useEffect(() => {
   let interval;
   if (timeRunning) {
     interval = setInterval(() => {
       setTime((prev) => prev + 1);
     }, 1000);
   }
   return () => clearInterval(interval);
 }, [timeRunning]);

  const timerFunction = (sec)=>{
        const mins = Math.floor(sec/60);
        const secs = sec % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

 return (
    <TimerContext.Provider value={{ time, setTime, timeRunning, setTimeRunning, timerFunction }}>
        {children}
    </TimerContext.Provider>
 );
};
export const useTimer = () => useContext(TimerContext);