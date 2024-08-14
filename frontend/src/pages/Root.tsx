import { Outlet } from 'react-router-dom';
import NavBar from '../Components/Navbar';

const Root = () => {
  return (
    <div className='min-h-dvh  px-[.7rem] flex flex-col gap-y-4 '>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
