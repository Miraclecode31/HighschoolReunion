import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    console.log("Home Button clicked!");
    navigate('/');
  };

  return (
    <div
      id="home-button-wrapper"
      style={{
        position: 'fixed',
        top: '2rem',
        left: '6rem',
        zIndex: 99999,
        pointerEvents: 'auto'
      }}
    >
      <button
        onClick={goToHomePage}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg z-[9999]"
        style={{
          pointerEvents: 'auto'
        }}
      >
        Home
      </button>
    </div>
  );
};

export default HomeButton;
