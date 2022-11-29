import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button_score from './Button_score';
import {useDispatch } from 'react-redux';
import {updateScore} from '../reducers/qm/question';


const Score = ({ children}) => {
  
  const incBen = () => {
    setScoreBen(scoreBen+1);
    dispatch(updateScore(scoreBen+1,scoreWorld));
    console.log("updateScore1");
  };
  const decBen = () => {
    setScoreBen(scoreBen-1);
    dispatch(updateScore(scoreBen-1,scoreWorld));
    console.log("updateScore1");

  };
  const incWorld = () => {
    setScoreWorld(scoreWorld+1);
    dispatch(updateScore(scoreBen,scoreWorld+1));
  };
  const decWorld = () => {
    setScoreWorld(scoreWorld-1);
    dispatch(updateScore(scoreBen,scoreWorld-1));
  };

 
  const styleScoreBen = {
    //color: "green",
    //background:  "#0f0",
    fontSize: "50px",
    width:"50%",
    textAlign:'left'
  };

  const styleScoreWorld = {
    //color: "green",
    //background:  "#0f0",
    fontSize: "50px",
    width:"50%",
    textAlign:'right'
  };

  const dispatch = useDispatch();
  const score = useSelector(state => state.quizzMasterApp.score);
  const [scoreBen, setScoreBen] = useState(score[0]);  
  const [scoreWorld, setScoreWorld] = useState(score[1]); 
  console.log("Score"+ JSON.stringify(score));  


  


return (
    <table border="0" size="100%" >
    <tr>   
    <th><div onClick={decBen}>-</div></th><th><div onClick={incBen}>+</div></th><th style={styleScoreBen}>Ben:{scoreBen}</th><th style={styleScoreWorld}>World:{scoreWorld} </th><th><div onClick={incWorld}>+</div></th><th><div onClick={decWorld}>-</div></th>
    </tr>
   </table>
  );
};


export default Score;
