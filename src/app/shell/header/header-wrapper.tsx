import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { isEmployee } from '../../utils/permissions';

import HeaderView from './header-view';
import { RootState } from '../../root.types';

type RouteProps = RouteComponentProps<{
  location: any;
}>;

interface StateProps {}

interface DispatchProps {}

type Props = RouteProps & StateProps & DispatchProps;

class HeaderWrapper extends React.Component<Props> {
  static displayName = 'HeaderWrapper';

  state = {
    openMenu: '',
  };

  toggleMenu = (elem: string): void => {
    const { openMenu } = this.state;

    let action = '';

    // Close any open menu
    if (elem === openMenu) {
      action = 'Close';
      this.setState({ openMenu: '' });

      // Open a different menu
    } else {
      action = 'Open';
      this.setState({ openMenu: elem });
    }
  };

  render() {
    const { location } = this.props;
    const { openMenu } = this.state;

    return <HeaderView openMenu={openMenu} toggleMenu={this.toggleMenu} location={location} />;
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {};
};

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderWrapper)
);
