import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';

import DivisionWrapper from './modules/division/division-wrapper';
import SummaryWrapper from './modules/summary/summary-wrapper';

import * as routes from '../constants/appRoutes';

interface IRouteProps {
  id?: string;
  query?: string;
}

interface IRouteConfig {
  exact?: boolean;
  path: string;
  render: (routeProps: RouteComponentProps<IRouteProps>) => React.ReactNode;
}

export const HOME: IRouteConfig = {
  exact: true,
  path: routes.HOME,
  render: () => <SummaryWrapper />,
};

export const DIVISION: IRouteConfig = {
  exact: true,
  path: routes.DIVISION,
  render: ({ match }) => {
    const { id } = match.params;

    if (!id) {
      return <Redirect to={routes.HOME} />;
    }

    return <DivisionWrapper divisionId={id} />;
  },
};

export default [HOME, DIVISION];
