import produce from 'immer';

import { setLoaderAction, stopLoaderAction } from './loader';
import { showPopUpAction } from './pop-up';
import { wsConnect } from './websocket';
import { checkFetchError, fetchApiSendJson } from '../utils';

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

export const applyTeam = (roomCode, name) => async dispatch => {
  try {
    dispatch(setLoaderAction('Applying team'));

    const response = await fetchApiSendJson(`rooms/${roomCode}/applications`, 'POST', { name });
    await checkFetchError(response);

    dispatch(wsConnect('TEAM_APPLIED'));
    dispatch(setLoaderAction('Waiting for the Quizz Master to review your application...'));
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
      default:
        return;
    }
  },
  {
    roomCode: {
      value: '',
      valid: false,
    },
    team: {
      value: '',
      valid: false,
    },
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
