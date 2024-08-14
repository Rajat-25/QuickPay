import { useMemo } from 'react';

const Avatar: React.FC<AvatarType> = ({ initial, extraClass, user }) => {
  const colorsList = [
    ' bg-red-500',
    ' bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    ' bg-indigo-500',
    'bg-lime-500',
    ' bg-amber-500',
    'bg-emerald-500',
    ' bg-fuchsia-500',
    ' bg-violet-500',
    ' bg-rose-500',
    ' bg-sky-500',
    ' bg-slate-500',
  ];

  const color = useMemo(() => {
    const idx = Math.floor(Math.random() * 8);
    if (user) {
      return ` ${colorsList[6]}  hover:scale-110 `;
    } else {
      return colorsList[idx];
    }
  }, [initial]);

  return (
    <span
      className={`flex items-center justify-center  text-white  ${color}  rounded-full text-lg sm:text-xl lg:text-2xl font-semibold  ${extraClass} w-[1.8rem] h-[1.8rem]  sm:w-[2.5rem] sm:h-[2.5rem] `}
    >
      {initial}
    </span>
  );
};

export default Avatar;
