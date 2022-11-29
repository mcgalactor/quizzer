import produce from 'immer';
import { setLoaderAction, stopLoaderAction } from '../loader';
import { showPopUpAction } from '../pop-up';
import { checkFetchError, fetchApi, fetchApiSendJson, shuffle } from '../../utils';
import { actions } from 'react-table';

export const fetchQuestions = selectedCategories => async dispatch => {
  try {
    dispatch(setLoaderAction('Retrieving Questions...'));
    dispatch({ type: 'CLEAR_QUESTIONS' });
    await Promise.all(
      selectedCategories.map(async ({ category }) => {
        const response = await fetchApi(`categories/${category}/questions`);
        const questions = await checkFetchError(response);
        dispatch({ type: 'QUESTIONS_FETCHED', questions });
        
        //console.log("QUESTIONS_FETCHED" + questions);
        //console.log(JSON.stringify(questions));
      })
    );
  } catch (error) {
    dispatch(showPopUpAction('ERROR', error.message));
  } finally {
    dispatch(stopLoaderAction());
  }
};

export const confirmQuestionAndContinue = (roomCode, question) => async dispatch => {
  try {
    dispatch(setLoaderAction('Loading...'));
    
    console.log("Roomcode:" + roomCode);
    const response = await fetchApiSendJson(`rooms/${roomCode}/question`, 'PUT', { question });
    const { questionClosed, questionNo } = await checkFetchError(response);

    dispatch({ type: 'CONFIRM_QUESTION_SELECTED', question, questionClosed, questionNo });
    

  } catch (error) {
    dispatch(showPopUpAction('ERROR', error.message));
  } finally {
    dispatch(stopLoaderAction());
  }
};




export const resetGuessStat = (option,valueParam) => async dispatch => {
  try {

    console.log("updateGuessStat");
    //const option=1;
    const value=valueParam+1;
    dispatch({ type: 'resetGuessCounter',option,value});

  } catch (error) {
    dispatch(showPopUpAction('ERROR', error.message));
  } finally {
    dispatch(stopLoaderAction());
  }
};



export const updateGuessStat = (option,valueParam) => async dispatch => {
  try {

    console.log("updateGuessStat");
    //const option=1;
    const value=valueParam+1;
    dispatch({ type: 'inkrementGuess',option,value});

  } catch (error) {
    dispatch(showPopUpAction('ERROR', error.message));
  } finally {
    dispatch(stopLoaderAction());
  }
};

export const updateScore = (BenScore,WorldScore) => async dispatch => {
  try {

    console.log("updateScore2");
    dispatch({ type: 'updateScore',BenScore,WorldScore});

  } catch (error) {
    dispatch(showPopUpAction('ERROR', error.message));
  } finally {
    dispatch(stopLoaderAction());
  }
};




export default produce((draft, action) => {
  switch (action.type) {
    case 'QUESTIONS_FETCHED':
      shuffle(action.questions);

      draft.questions = [...draft.questions, ...action.questions];

      return;
    case 'ITEM_LIST_CHANGED_QUESTIONS':
      draft.selectedQuestion = action.value;
      console.log(JSON.stringify(draft.selectedQuestion));
      return;
    case 'CLEAR_QUESTIONS':
      draft.questions = [];
      return;
    case 'CONFIRM_QUESTION_SELECTED':
      draft.currentQuestion = action.question;
      draft.questionsAsked = [...draft.questionsAsked, action.question._id];
      draft.questionClosed = action.questionClosed;
      draft.question = action.questionNo;
      draft.selectedQuestion = null;

      return;
      
      
    case 'inkrementGuess':
      switch (action.option){
        
        case 0:
          draft.guessStat[0]++;
          break;
        case 1:
            draft.guessStat[1]++;
            break;
        case 2:
          draft.guessStat[2]++;
          break;
        case 3:
          draft.guessStat[3]++;
          break;
        
        
      }
      return;
      
      case 'resetGuessCounter':
        console.log("power debug");
        //console.log(JSON.stringify(draft));
        console.log(JSON.stringify(action));
        draft.guessStat[0]=0;
        draft.guessStat[1]=0;
        draft.guessStat[2]=0;
        draft.guessStat[3]=0;
        return;
       ;
       
       
       case 'updateScore':
        console.log("power debug updascore 3");
        //console.log(JSON.stringify(draft));
        console.log(JSON.stringify(action));
        
        draft.score[0]=action.BenScore;
        draft.score[1]=action.WorldScore;
        
        console.log(draft.score[0]);
        console.log(draft.score[1]);
        return;
       ;
      
      
      
       default:
        return;
  }
});
