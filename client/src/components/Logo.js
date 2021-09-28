import React from 'react';

const Logo = ({ fontSize = '6.5em', center }) => (
  <h1
    className="font-badaboombb text-8xl select-none"
    style={{ fontSize, textAlign: center ? 'center' : null }}
  >
    Quizzer!
  </h1>
);

export default Logo;
