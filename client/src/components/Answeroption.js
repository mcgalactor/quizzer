import React from 'react';
import { useSelector } from 'react-redux';


const Answeroption = ({ children, style1,style2,style3,option,optioncounter}) => {
  
  console.log("correct:" + children);
  
return (
    <tr>   
    <th style={style1}>{children}</th><th style={style2}>{option}</th><th style={style3}>{optioncounter}</th>
  </tr>
  );
};


export default Answeroption;
