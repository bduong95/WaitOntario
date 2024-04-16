import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Header from './Header';
import Footer from './Footer';
import '../styles/Timer.css';

function Timer() {
    const { user } = useAuth();
    const initialCount = 25 * 60; // 25 minutes converted to seconds
    const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount <= 1) {
          clearInterval(interval); // Clear interval if count is 0 or less
          return 0;
        }
        return currentCount - 1; // Decrease count by 1
      });
    }, 1000); // Countdown in seconds

    return () => clearInterval(interval);
  }, []);

  // Function to format time in minutes and seconds
  const formatTime = (count) => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`; // Pad seconds with zero if less than 10
  };

  return (
    <div>
        <Header />
        <div className='container'>
            <h1>You have been successfully added to the waitlist, the average wait times are as follows:</h1>
            <h2>Timer: {formatTime(count)}</h2>
        </div>
        <Footer />
    </div>
  );
}

export default Timer;