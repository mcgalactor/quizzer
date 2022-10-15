import produce from 'immer';

import { setLoaderAction, stopLoaderAction } from './loader';
import { showPopUpAction } from './pop-up';
import { wsConnect } from './websocket';
import { checkFetchError, fetchApiSendJson, fetchApi } from '../utils';

export const textInputHandlerAction = (name, value, minLength, maxLength, uppercase) => {
  return {
    type: 'TEXT_INPUT_HANDLER',
    name,
    value,
    minLength,
    maxLength,
    uppercase,
  };
};

export const applyTeam = (roomCode,team, name) => async dispatch => {
  try {
    console.log(roomCode, team,name)

    dispatch(setLoaderAction('Applying team'));
    dispatch(clearTeamRoom());

    const response = await fetchApiSendJson(`rooms/${roomCode}/applications`, 'POST', { name,team });
    //console.log(response);
    await checkFetchError(response);
    dispatch(wsConnect('TEAM_APPLIED'));
    dispatch(setLoaderAction('Waiting for the Quizz Master to review your application...'));
    console.log("check1");
  } catch (error) {
    dispatch(stopLoaderAction());
    dispatch(showPopUpAction('ERROR', error.message));
  }
  console.log("check2");
};

export const clearTeamHome = () => ({ type: 'CLEAR_TEAM_HOME' });

export const clearTeamRoom = () => ({ type: 'CLEAR_TEAM_ROOM' });

export const fetchRoom = roomCode => async dispatch => {
  console.log("fetchroom1");
  try {
    console.log("fetchroom2");
    dispatch(setLoaderAction('Loading question...'));
    console.log("fetchroom3");
    const response = await fetchApi(`rooms/${roomCode}`, 'GET');
    console.log(response);

    console.log("fetchroom4");
    const { round, questionNo, questionClosed, category, question, teamID } = await checkFetchError(
      response
    );

    console.log(round +" "+ questionNo +" "+ questionClosed +" "+  category +" "+  question +" "+  teamID);
    console.log("fetchroom5");
    dispatch({ type: 'SET_ROOM', round, questionNo, questionClosed, category, question, teamID });
    console.log("fetchroom6");
  } catch (error) {
    dispatch(showPopUpAction('ERROR', error.message));
  } finally {
    console.log("fetchroom7");
    dispatch(stopLoaderAction());
  }
};

export const closeQuestion = roomCode => async dispatch => {
  try {
    dispatch(setLoaderAction('Loading room...'));

    const response = await fetchApi(`rooms/${roomCode}`, 'GET');
    const { questionClosed } = await checkFetchError(response);

    dispatch({ type: 'CLOSE_QUESTION', questionClosed });
    dispatch(setLoaderAction('Question closed. The Quizz Master is reviewing your guess.'));
  } catch (error) {
    dispatch(showPopUpAction('ERROR', error.message));
  }
};

export const submitGuess = (roomCode, teamID, guess) => async dispatch => {
  try {
    dispatch(setLoaderAction('Submitting answer...'));

    const response = await fetchApiSendJson(`rooms/${roomCode}/teams/${teamID}`, 'PATCH', {
      guess,
    });
    await checkFetchError(response);

    dispatch(setLoaderAction('Waiting for the Quizz Master to close the question...'));
  } catch (error) {
    dispatch(stopLoaderAction());
    dispatch(showPopUpAction('ERROR', error.message));
  }
};

const teamAppReducer = produce(
  (draft, action) => {
    switch (action.type) {
      case 'TEXT_INPUT_HANDLER':
        if (action.value.length < action.minLength || action.value.length > action.maxLength) {
          draft[action.name].valid = false;
        } else {
          draft[action.name].valid = true;
        }

        if (action.uppercase) {
          draft[action.name].value = action.value.toUpperCase();
          return;
        }
        draft[action.name].value = action.value;
        return;
      case 'CLOSE_QUESTION':
        draft.question.open = !action.questionClosed;
        return;
      case 'SET_ROOM':
        console.log("setroom")
        draft.roundNo = action.round;
        draft.question.number = action.questionNo;
        draft.question.open = !action.questionClosed;
        draft.question.category = action.category;
        draft.question.question = action.question;
        draft.guess.value = '';
        draft.guess.valid = false;
        draft.teamID = action.teamID;
        return;
      case 'CLEAR_TEAM_HOME':
        draft.roomCode.value = '';
        draft.roomCode.valid = false;
        draft.team.value = '';
        draft.team.valid = false;
        return;
      case 'CLEAR_TEAM_ROOM':
        draft.teamID = null;
        draft.roundNo = 0;
        draft.question.open = false;
        draft.question.number = 0;
        draft.question.question = '';
        draft.question.category = '';
        draft.guess.value = '';
        draft.guess.valid = false;
        return;
      default:
        return;
    }
  },
  {
    teamID: null,
    roomCode: {
      value: '0000',
      valid: true,
    },
    team: {
      value: '',
      valid: false,
    },
    name: {
      value: '',
      valid: false,
    },
    roundNo: 0,
    question: {
      open: false,
      number: 0,
      question: '',
      category: '',
    },
    guess: {
      value: '',
      valid: false,
    },
  }
);

export default teamAppReducer;
