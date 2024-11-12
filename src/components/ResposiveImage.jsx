import React, { useState, useEffect } from 'react';

const ResponsiveImage = ({ imgMobile, imgDesktop }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(handleResize);

    return () => mediaQuery.removeListener(handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <img src={imgMobile} className='rounded-lg' alt="Image to phone" />
      ) : (
        <img src={imgDesktop} className='rounded-lg' alt="Image to desktop" />
      )}
    </div>
  );
};

export default ResponsiveImage;
