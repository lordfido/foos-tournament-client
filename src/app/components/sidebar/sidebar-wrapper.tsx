import * as React from 'react';

import SidebarView from './sidebar-view';

interface IOwnProps {
  children: React.ReactNode;
  isRight: boolean;
  title: string;
}

const SidebarWrapper = ({ children, isRight, title }: IOwnProps) => {
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SidebarView handleToggleSidebar={handleToggleSidebar} isOpen={isOpen} isRight={isRight} title={title}>
      {children}
    </SidebarView>
  );
};

export default SidebarWrapper;
