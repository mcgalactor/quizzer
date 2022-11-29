import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useState } from "react";
import Button from './Button';
import Score from './Score';
import Answeroption from './Answeroption';
import { fetchRoomState, closeRoomQuestion, questionCompleted } from '../reducers/qm/room';
import { toggleGuessCorrect } from '../reducers/qm/guess';
import {resetGuessStat, updateGuessStat} from '../reducers/qm/question';


const styleCorrect = {
  color: "red",
  background: "#0f0",
  fontSize: "32px",
  width:"45%",
  textAlign:'left'
  
};

const styleNormal = {
  //color: "green",
  //background:  "#0f0",
  fontSize: "32px",
  width:"45%",
  textAlign:'left'
};




const style1Correct = {
  color: "red",
  background: "#0f0",
  fontSize: "32px",
  width:"10%",
  textAlign:'left'
  
};

const style1Normal = {
  //color: "green",
  //background:  "#0f0",
  fontSize: "32px",
  width:"10%",
  textAlign:'left'
};



const style3Correct = {
  color: "red",
  background: "#0f0",
  fontSize: "32px",
  width:"10%",
  textAlign:'right'
  
};

const style3Normal = {
  //color: "green",
  //background:  "#0f0",
  fontSize: "32px",
  width:"10%",
  textAlign:'right'
};



const Header = () => {
   const showanswer = () => {
    if (reveal){
      setState(false);
    }else{
      setState(true);
    }
    console.log ("reveal:" + reveal);
  };

  const questionNo = useSelector(state => state.quizzMasterApp.question);
  const round = useSelector(state => state.quizzMasterApp.round);
  const { question, answer,questiontype,options} = useSelector(state => state.quizzMasterApp.currentQuestion);
  const guessStat=useSelector(state => state.quizzMasterApp.guessStat);
  const dispatch = useDispatch();

  
  const [reveal, setState] = useState(false);  
  const buttonText=reveal?"Hide Answers":"Show Answers";
  return (
    <Row>
      <Col xs={8} push={{ xs: 2 }} style={{ textAlign: 'center' }}>
        <h1>
          Round {round} Question {questionNo}
        </h1>
        <h2>Question: {question}</h2>
        
        <Answeroption style1={!(answer===1&&reveal)?style1Normal:style1Correct} style2={!(answer===1&&reveal)?styleNormal:styleCorrect} style3={!(answer===1&&reveal)?style3Normal:style3Correct} option={options[0]} optioncounter={guessStat[0]}>1</Answeroption>
        <Answeroption style1={!(answer===2&&reveal)?style1Normal:style1Correct} style2={!(answer===2&&reveal)?styleNormal:styleCorrect} style3={!(answer===2&&reveal)?style3Normal:style3Correct} option={options[1]} optioncounter={guessStat[1]}>2</Answeroption>
        <Answeroption style1={!(answer===3&&reveal)?style1Normal:style1Correct} style2={!(answer===3&&reveal)?styleNormal:styleCorrect} style3={!(answer===3&&reveal)?style3Normal:style3Correct} option={options[2]} optioncounter={guessStat[2]}>3</Answeroption>
        <Answeroption style1={!(answer===4&&reveal)?style1Normal:style1Correct} style2={!(answer===4&&reveal)?styleNormal:styleCorrect} style3={!(answer===4&&reveal)?style3Normal:style3Correct} option={options[3]} optioncounter={guessStat[3]}>4</Answeroption>
        
       
        <Button onClick={showanswer}>{buttonText}</Button>
     
       <br/>
         <br/>
         <br/>
        <br/>
  

      </Col>
    </Row>
  );
};
//<h2>Right Answer: {answer}</h2>
const TeamGuess = ({ team: teamNo }) => {
  
  const { question, answer,questiontype} = useSelector(state => state.quizzMasterApp.currentQuestion);
  const dispatch = useDispatch();
  const roomCode = useSelector(state => state.quizzMasterApp.roomCode);
  const team = useSelector(state => state.quizzMasterApp.approvedTeamApplications[teamNo]);
  const questionClosed = useSelector(state => state.quizzMasterApp.questionClosed);
  const approvingATeamGuess = useSelector(state => state.quizzMasterApp.approvingATeamGuess);
  
 
 
  const toggleGuess = useCallback(() => {
    dispatch(toggleGuessCorrect(roomCode, team._id, !team.guessCorrect));

  }, [roomCode, team, dispatch]);
  
  if (questiontype==="multi"){
    if (!team) {
      return <Col />;
    }
    console.log("TeamGuess");
    console.log(JSON.stringify(team.guess));
    if (team.name!="ben"){
    switch (team.guess){
      case "1":
        console.log("case 1");
        dispatch(updateGuessStat(0,1));
        break;
      case "2":
        console.log("case 2");
        dispatch(updateGuessStat(1,1));
        break;
      case "3":
        console.log("case 3");
        dispatch(updateGuessStat(2,1));
        break;
      case "4":
        console.log("case 4");
        dispatch(updateGuessStat(3,1));
        break;
      default:
        console.log("default");
    }
  }
    if (answer==team.guess){
      console.log("Answer correct "+ answer + " "+ team.guess);
    }else{
      console.log("Answer wrong "+ answer + " "+ team.guess);
    }
    console.log("TeamName:"+ team.name);
    if (team.name!="ben"){
    return (      
      
      <Col>
        <div className="team-guess">
         
        </div>
      </Col>
    );
    }else{
      return(
      <Col>
      <div className="team-guess">
        <h3>{team.name}</h3>
        <h3>{team.guess || '-'}</h3>

        {questionClosed && (
          <Button type="small" onClick={toggleGuess} disabled={approvingATeamGuess || !team.guess}>
            {
            console.log("questiontype:" + questiontype)
            
            }          
            {team.guessCorrect ? (
              <span role="img" aria-label={`Approve team ${team.name}'s guess`}>
                👍
              </span>
            ) : (
              <span role="img" aria-label={`Reject team ${team.name}'s guess`}>
                👎
              </span>
            )}
          </Button>
        )}
      </div>
    </Col>

  );



    }
              
  }else{

    if (!team) {
      return <Col />;
    }
    return (
      
      
      <Col>
        <div className="team-guess">
          <h3>{team.name}</h3>
          <h3>{team.guess || '-'}</h3>

          {questionClosed && (
            <Button type="small" onClick={toggleGuess} disabled={approvingATeamGuess || !team.guess}>
              {
              console.log("questiontype:" + questiontype)
              //if team.guess===answer
              }          
              
              {team.guessCorrect ? (
                <span role="img" aria-label={`Approve team ${team.name}'s guess`}>
                  👍
                </span>
              ) : (
                <span role="img" aria-label={`Reject team ${team.name}'s guess`}>
                  👎
                </span>
              )}
            </Button>
          )}
        </div>
      </Col>
    );



  }
};

const NumberofTeamsrender= () => {
  
  const dispatch = useDispatch();
  const teams = useSelector(state => state.quizzMasterApp.approvedTeamApplications);
  let teamsArr = [];
  teamsArr.push(TeamGuess(0));
  let string=""
  /*
  for (let index = 0; index < teams.length; index++) {
    <TeamGuess team={index} />;    
  }*/
  //console.log("NumberofTeamsrender:"+  JSON.stringify(teamsArr));


  
  console.log("NumberofTeamsrender function");
  return teamsArr;
  




}

const Guesses = () => {
  const dispatch = useDispatch();
  dispatch(resetGuessStat(1,1));

  const teams = useSelector(state => state.quizzMasterApp.approvedTeamApplications);
  console.log("Teams:"+  JSON.stringify(teams.length));
  let string=""
  
  return (
    

    <>
      <Row className="top-anxiety">
        <TeamGuess team={0} />
        <TeamGuess team={1} />
        <TeamGuess team={2} />
      </Row>
      <Row className="top-anxiety">
        <TeamGuess team={3} />
        <TeamGuess team={4} />
        <TeamGuess team={5} />
      </Row>
    </>
  );
};

const NextButton = () => {
  const dispatch = useDispatch();
  
  const questionClosed = useSelector(state => state.quizzMasterApp.questionClosed);
  const roomCode = useSelector(state => state.quizzMasterApp.roomCode);

  return (
    <Row className="top-anxiety">
      <Col xs={4} push={{ xs: 4 }}>
        {questionClosed ? (
          <Button
            onClick={() => {
              dispatch(questionCompleted(roomCode));
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch(closeRoomQuestion(roomCode));
            }}
          >
            Close Question
          </Button>
        )}
      </Col>
    </Row>
  );
};

const QMGuesses = () => {
  const dispatch = useDispatch();
  const roomCode = useSelector(state => state.quizzMasterApp.roomCode);
  const currentQuestion = useSelector(state => state.quizzMasterApp.currentQuestion);



  useEffect(() => {
    dispatch(fetchRoomState(roomCode));
  }, [dispatch, roomCode]);

  if (!currentQuestion) {
    return <Redirect to="/master/categories" />;
  }

  return (
    <Container className="top-anxiety">
    <Score>+</Score>
      <Header />
      <Guesses />
      <NextButton />
    </Container>
  );
};

export default QMGuesses;
