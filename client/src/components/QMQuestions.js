import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';
import { Redirect } from 'react-router-dom';

import { fetchQuestions, confirmQuestionAndContinue } from '../reducers/qm/question';
import Button from './Button';
import ItemList from './ItemList';
import ItemListHeader from './ItemListHeader';
import { CenterLoader } from './Loader';
import Logo from './Logo';

const QMQuestions = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loader.active);
  const code = useSelector(state => state.quizzMasterApp.roomCode);
  const roundNo = useSelector(state => state.quizzMasterApp.round);
  const questionNo = useSelector(state => state.quizzMasterApp.question);
  const selectedCategories = useSelector(state => state.quizzMasterApp.selectedCategories);
  const questions = useSelector(state => state.quizzMasterApp.questions);
  const questionsAsked = useSelector(state => state.quizzMasterApp.questionsAsked);
  const selectedQuestion = useSelector(state => state.quizzMasterApp.selectedQuestion);
  const currentQuestion = useSelector(state => state.quizzMasterApp.currentQuestion);

  useEffect(() => {
    dispatch(fetchQuestions(selectedCategories));
  }, [dispatch, selectedCategories]);

  if (currentQuestion) {
    return <Redirect to="/master/guesses" />;
  } else if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <div className="container space-y-4 mx-auto">
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex flex-col justify-center text-3xl">
          <div>
            <span className="font-extralight">Round: </span>
            <span>{roundNo}</span>
          </div>
          <div>
            <span className="font-extralight">Question: </span>
            <span>{questionNo + 1}</span>
          </div>
        </div>
        <div className="col-span-1">
          <Logo center />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-8">
          {selectedCategories.map(category => {
            return (
              <div key={`${category.id}-1`}>
                <ItemListHeader>{category.category}</ItemListHeader>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-8">
          {selectedCategories.map(category => (
            <div key={`${category.id}-2`}>
              <ItemList
                items={questions
                  .reduce((acc, cur) => {
                    return cur.category === category.category && !questionsAsked.includes(cur._id)
                      ? acc.concat({ id: cur._id, ...cur })
                      : acc;
                  }, [])
                  .slice(0, 5)}
                show="question"
                selectable
                reducer={['quizzMasterApp', 'selectedQuestion']}
                dispatchAs="QUESTIONS"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-start-2 col-span-1">
          <Button
            disabled={!selectedQuestion}
            onClick={() => dispatch(confirmQuestionAndContinue(code, selectedQuestion))}
          >
            Start question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QMQuestions;
