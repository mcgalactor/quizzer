import React from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { stopLoaderAction } from '../reducers/loader';
import { submitGuess } from '../reducers/team-app';

import Loader from './Loader';
import Input from './Input';
import Button from './Button';

const TeamRoom = () => {

  console.log("isloading");
  const isLoading = useSelector(state => state.loader.active);
  const roomCode = useSelector(state => state.teamApp.roomCode.value);
  const teamID = useSelector(state => state.teamApp.teamID);
  const roundNo = useSelector(state => state.teamApp.roundNo);
  const open = useSelector(state => state.teamApp.question.open);
  const questionNo = useSelector(state => state.teamApp.question.number);
  const category = useSelector(state => state.teamApp.question.category);
  const question = useSelector(state => state.teamApp.question.question);
  const options = useSelector(state => state.teamApp.question.options);
  const questiontype2 = useSelector(state => state.teamApp.question.questiontype);
  const test = useSelector(state => state.teamApp.question);
  const guess = useSelector(state => state.teamApp.guess.value);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (questiontype==="freetext"){
      dispatch(submitGuess(roomCode, teamID, guess));
      console.log("handleSubmit:" +" "+  active);
    }
    if (questiontype==="multi"){
      if (active!==0){
        dispatch(submitGuess(roomCode, teamID, active.toString()));
        console.log("handleSubmit:" +" "+  active);
        setActive(0);
      }
    }

  };

  const handleChangeAnswer = () => {
    dispatch(stopLoaderAction());
  };
  const [active, setActive] = useState(0);
 
 
  const handleClickAnswer = (id) => {
    setActive(id);
    /*console.log("test" + test);
    console.log(JSON.stringify(test));
    console.log("change active to:" + " "+  active);
    console.log("questionstype:"+ questiontype2);
    console.log("options:"+ options);   */
  };


const questiontype="multi";
  
if (questiontype==="freetext"){

if (isLoading || !open){
  //return isLoading || !open ? (
    return (
    <>
      <Loader /> {open && <Button onClick={handleChangeAnswer}>Change answer</Button>}
    </>)
   }  else{
    return(
    <>
      <span className="round-number">{`Round ${roundNo}`}</span>
      <span className="question-number">{`Question ${questionNo}`}</span>
      <span className="category">{category}</span>
      <span className="question">{question}</span>
      <Input reducer="teamApp" item="guess" placeholder="Your answer" labelText="Answer" maxLength="50" showCounter />
      <Button onClick={handleSubmit}>Submit!</Button>
    </>
      )
  };
}

if (questiontype==="multi"){

  if (isLoading || !open){
    //return isLoading || !open ? (
      return (
      <>
        <Loader /> {open && <Button onClick={handleChangeAnswer}>Change answer</Button>}
      </>)
     }  else{
      return(
      <>
        <span className="round-number">{`Round ${roundNo}`}</span>
        <span className="question-number">{`Question ${questionNo}`}</span>
        <span className="category">{category}</span>
        <span className="question">{question}</span>
        
        <Button onClick={()=>handleClickAnswer(1)} style={{ backgroundColor: (active===1) ? "green" : "red" }}>{options[0]}</Button>
        <Button onClick={()=>handleClickAnswer(2)} style={{ backgroundColor: (active===2) ? "green" : "red" }}>{options[1]}</Button>
        <Button onClick={()=>handleClickAnswer(3)} style={{ backgroundColor: (active===3) ? "green" : "red" }}>{options[2]}</Button>
        <Button onClick={()=>handleClickAnswer(4)} style={{ backgroundColor: (active===4) ? "green" : "red" }}>{options[3]}</Button>
        <br/><br/><br/><br/>
        <Button onClick={handleSubmit}>Submit!</Button>
      </>
        )
    };
  }

};

export default TeamRoom;
