import * as React from 'react';
import classnames from 'classnames';
import { isInstalledPWA } from '../common/utils/platforms';

import HeaderWrapper from './shell/header/header-wrapper';
import FooterWrapper from './shell/footer/footer-wrapper';
import NotifierWrapper from './modules/notifier/notifier-wrapper';

class AppView extends React.Component {
  static displayName = 'AppView';

  render() {
    const { children } = this.props;

    return (
      <div
        id="app"
        className={classnames('App', {
          'is-pwa': isInstalledPWA(),
        })}
      >
        <HeaderWrapper />
        <div className="App-content">{children}</div>
        <FooterWrapper />
        <NotifierWrapper />
      </div>
    );
  }
}

export default AppView;
