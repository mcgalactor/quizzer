import React from 'react';
import clsx from 'clsx';

const Logo = center => (
  <h1 className={clsx('font-badaboombb text-8xl select-none', center && 'text-center')}>
    Quizzer!
  </h1>
);

export default Logo;
