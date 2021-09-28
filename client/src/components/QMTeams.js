import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from './Button';
import ItemList, { StaticItemList } from './ItemList';
import ItemListHeader from './ItemListHeader';
import {
  approveSelectedApplication,
  rejectSelectedApplication,
  confirmTeamsAndContinue,
} from '../reducers/qm/team';
import Logo from './Logo';

const QMTeams = () => {
  const dispatch = useDispatch();
  const code = useSelector(state => state.quizzMasterApp.roomCode);
  const teamApplications = useSelector(state => state.quizzMasterApp.teamApplications);
  const approvedTeamApplications = useSelector(
    state => state.quizzMasterApp.approvedTeamApplications
  );
  const selectedTeamApplication = useSelector(
    state => state.quizzMasterApp.selectedTeamApplication
  );
  const roomClosed = useSelector(state => state.quizzMasterApp.roomClosed);

  const actionButtonsDisabled = !teamApplications.length || !selectedTeamApplication || roomClosed;

  if (!code) {
    return <Redirect to="/master" />;
  } else if (roomClosed) {
    return <Redirect to="/master/categories" />;
  }

  return (
    <div className="container space-y-4 mx-auto">
      <Logo center />
      <div>
        <div className="grid grid-cols-qm-selection gap-8">
          <div>
            <ItemListHeader>Applied Teams</ItemListHeader>
          </div>
          <div className="text-center">
            <h2 className="pt-6 text-xl">
              <span className="font-extralight">Room code: </span>
              <span className="font-normal">{code}</span>
            </h2>
          </div>
          <div>
            <ItemListHeader>Approved Teams</ItemListHeader>
          </div>
        </div>
        <div className="grid grid-cols-qm-selection gap-8">
          <div>
            <ItemList
              items={teamApplications}
              show="name"
              selectable
              reducer={['quizzMasterApp', 'selectedTeamApplication']}
              dispatchAs="APPLIED"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              disabled={actionButtonsDisabled || approvedTeamApplications.length >= 6}
              onClick={() => dispatch(approveSelectedApplication(selectedTeamApplication, code))}
            >
              Approve team
            </Button>
            <Button
              disabled={actionButtonsDisabled}
              onClick={() => dispatch(rejectSelectedApplication(selectedTeamApplication, code))}
            >
              Reject team
            </Button>
            <Button
              disabled={
                approvedTeamApplications.length < 2 ||
                approveSelectedApplication.length >= 6 ||
                roomClosed
              }
              onClick={() => dispatch(confirmTeamsAndContinue(code))}
            >
              Next
            </Button>
          </div>
          <div>
            <StaticItemList items={approvedTeamApplications} show="name" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QMTeams;
