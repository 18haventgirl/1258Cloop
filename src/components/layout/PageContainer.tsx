import { PropsWithChildren } from 'react';

const PageContainer = ({ children }: PropsWithChildren) => {
  return <div className="container-page">{children}</div>;
};

export default PageContainer;
