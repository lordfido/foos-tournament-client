import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames';

import { HOME } from '../../../constants/appRoutes';

import HeaderMenu from './header-menu';
import Avatar from '../../components/avatar';
import Link, { LinkProps } from '../../components/link';
import Space from '../../components/space';

interface OwnProps {
  openMenu: string;
  toggleMenu: (elem: string) => void;
  location: any;
}

class HeaderView extends React.Component<OwnProps> {
  static displayName = 'HeaderView';

  render() {
    const { openMenu, toggleMenu, location } = this.props;

    const classes = {
      headerLogo: classnames('Link', 'Header-logo', 'Header-toggler'),
    };

    return (
      <header className="Header">
        {/* App's logo */}
        <RouterLink className={classes.headerLogo} to={HOME}>
          <img src="src/images/logo.png" />
        </RouterLink>
      </header>
    );
  }
}

export default HeaderView;
