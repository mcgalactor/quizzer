import produce from 'immer';
import { setLoaderAction, stopLoaderAction } from '../loader';
import { showPopUpAction } from '../pop-up';
import { checkFetchError, fetchApi, fetchApiSendJson, shuffle } from '../../utils';

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
    
    //console.log("CONFIRM_QUESTION_SELECTED" + question);
    //console.log(JSON.stringify(question));
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
      //console.log("QUESTIONS_FETCHED" + action.questions);
      //console.log(JSON.stringify(action.questions));
      draft.questions = [...draft.questions, ...action.questions];
      //console.log(JSON.stringify(draft.questions));
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
      console.log(JSON.stringify(draft.currentQuestion));
      console.log(JSON.stringify(draft.questionsAsked));
      console.log(JSON.stringify(draft.questionClosed));
      console.log(JSON.stringify(draft.question));
      //console.log(JSON.stringify(draft.currentQuestion));
      return;
    default:
      return;
  }
});
