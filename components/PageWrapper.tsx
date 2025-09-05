
import React, { useEffect } from 'react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-page-fade-in">
      {children}
    </div>
  );
};

export default PageWrapper;
