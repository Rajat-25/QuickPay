import React from 'react';

const Button: React.FC<ButtonType> = ({
  type,
  children,
  onClick,
  extraClass,
  style,
}) => {
  const btnColor = {
    primary: 'bg-blue-500 ',
    success: 'bg-green-500 ',
    danger: 'bg-red-500 ',
  };

  const btnStyle =
    'px-[.55rem] py-[.35rem]  md:px-[1rem] md:py-[.5rem] lg:px-[.9rem] lg:py-[.4rem] hover:scale-105  outline-none text-white rounded-full ' +
    btnColor[style] +
    extraClass;

  return (
    <button
      type={type ? type : 'button'}
      className={btnStyle}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
