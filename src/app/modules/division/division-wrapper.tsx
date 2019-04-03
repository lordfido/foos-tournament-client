import * as React from 'react';
import { connect } from 'react-redux';

import { fetchDivisionDetails } from '../../actions/divisions';
import { getDivision } from '../../reducers';

import { IRootState } from '../../../models';
import { IDivision } from '../../../models/divisions';
import DivisionView from './division-view';

interface IOwnProps {
  divisionId: string;
}

interface IStateProps {
  division?: IDivision;
}

interface IDispatchProps {
  FetchDivisionDetails: (divisionId: string) => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

const DivisionWrapper = ({ divisionId, division, FetchDivisionDetails }: Props) => {
  const reactToChangeDivisionEffect = () => {
    FetchDivisionDetails(divisionId);
  };

  React.useEffect(reactToChangeDivisionEffect, [divisionId]);

  if (!division) {
    return null;
  }

  return <DivisionView division={division} />;
};

const mapStateToProps = (state: IRootState, ownProps: IOwnProps) => ({
  division: getDivision(state)(ownProps.divisionId),
});

const mapDispatchToProps = {
  FetchDivisionDetails: fetchDivisionDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DivisionWrapper);
