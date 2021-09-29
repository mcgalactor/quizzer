import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';
import { Redirect } from 'react-router-dom';

import Button from './Button';
import ItemList from './ItemList';
import ItemListHeader from './ItemListHeader';
import {
  fetchCategories,
  selectCategory,
  deselectCategory,
  confirmCategoriesAndContinue,
} from '../reducers/qm/category';
import { endQuizz } from '../reducers/qm/room';
import { CenterLoader } from './Loader';
import Logo from './Logo';

const QMCategories = () => {
  const dispatch = useDispatch();
  const code = useSelector(state => state.quizzMasterApp.roomCode);
  const roundNo = useSelector(state => state.quizzMasterApp.round);
  const isLoading = useSelector(state => state.loader.active);
  const categories = useSelector(state => state.quizzMasterApp.categories);
  const selectedCategories = useSelector(state => state.quizzMasterApp.selectedCategories);
  const selectedCategory = useSelector(state => state.quizzMasterApp.selectedCategory);
  const roundStarted = useSelector(state => state.quizzMasterApp.roundStarted);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  const middleWidth = 3;

  if (roundStarted) {
    return <Redirect to="/master/questions" />;
  } else if (isLoading) {
    return <CenterLoader />;
  }

  return (
    <div className="container space-y-4 mx-auto">
      <Logo center />
      <div>
        <div className="grid grid-cols-qm-selection gap-8">
          <div>
            <ItemListHeader>Categories</ItemListHeader>
          </div>
          <div className="text-center">
            <h2 className="pt-6 text-xl">
              <span className="font-extralight">Round: </span>
              <span className="font-normal">{roundNo + 1}</span>
            </h2>
          </div>
          <div>
            <ItemListHeader>Selected Categories</ItemListHeader>
          </div>
        </div>
        <div className="grid grid-cols-qm-selection gap-8">
          <div>
            <ItemList
              items={categories}
              show="category"
              selectable
              reducer={['quizzMasterApp', 'selectedCategory']}
              dispatchAs="CATEGORIES"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              disabled={
                selectedCategories.length >= 3 ||
                !selectedCategory ||
                !categories.includes(selectedCategory)
              }
              onClick={() => dispatch(selectCategory())}
            >
              Select category
            </Button>
            <Button
              disabled={!selectedCategory || !selectedCategories.includes(selectedCategory)}
              onClick={() => dispatch(deselectCategory())}
            >
              Deselect category
            </Button>
            <Button
              disabled={selectedCategories.length < 3}
              onClick={() => dispatch(confirmCategoriesAndContinue(code, selectedCategories))}
            >
              Start round
            </Button>
            {roundNo >= 1 && (
              <Button type="secondary" onClick={() => dispatch(endQuizz(code))}>
                End Quizz
              </Button>
            )}
          </div>
          <div>
            <ItemList
              items={selectedCategories}
              show="category"
              selectable
              reducer={['quizzMasterApp', 'selectedCategory']}
              dispatchAs="CATEGORIES"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QMCategories;
