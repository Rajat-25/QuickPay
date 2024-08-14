import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useHelperHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return {navigate, dispatch};
};

export default useHelperHook;
