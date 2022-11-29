import React from 'react';
import { useSelector } from 'react-redux';
import {useDispatch } from 'react-redux';

const styleNormal = {
  background: "#00FFFF",
  border: "none",
  color: "white",
  //padding: "1px 1px",
  align: "center",
  minWidth :"1.0 rem",
  minheight:"1.0 rem",
  height:"1 px",
  width:"1 px",
  //display: "inline-block",
  //fontSize: "16px",
  //margin: "1px 1px"
};


const Button_score = ({children, ...rest }) => {
   return (
    <button style={styleNormal}minWidth='1.0 rem' minheight='1.0' {...rest}>
      {children}
    </button>
  );
};

export default Button_score;
