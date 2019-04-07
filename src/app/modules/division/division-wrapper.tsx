import * as React from 'react';
import { connect } from 'react-redux';

import { fetchDivisionDetails } from '../../actions/divisions';
import { getCurrentDivisions, getDivision } from '../../reducers';

import { IRootState } from '../../../models';
import { IDivision } from '../../../models/divisions';
import DivisionView from './division-view';

interface IOwnProps {
  divisionId: string;
}

interface IStateProps {
  division?: IDivision;
  divisionIndex: number;
  divisionsLength: number;
}

interface IDispatchProps {
  FetchDivisionDetails: (divisionId: string) => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

const DivisionWrapper = ({ divisionId, division, divisionIndex, divisionsLength, FetchDivisionDetails }: Props) => {
  const reactToChangeDivisionEffect = () => {
    FetchDivisionDetails(divisionId);
  };

  React.useEffect(reactToChangeDivisionEffect, [divisionId]);

  if (!division) {
    return null;
  }

  return <DivisionView division={division} divisionIndex={divisionIndex} divisionsLength={divisionsLength} />;
};

const mapStateToProps = (state: IRootState, ownProps: IOwnProps) => {
  const divisions = getCurrentDivisions(state);
  return {
    division: getDivision(state)(ownProps.divisionId),
    divisionIndex: divisions.findIndex(d => d.id === ownProps.divisionId),
    divisionsLength: divisions.length,
  };
};

const mapDispatchToProps = {
  FetchDivisionDetails: fetchDivisionDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionWrapper);
