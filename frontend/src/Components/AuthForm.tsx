import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const AuthForm = <T,>({
  linkTitle,
  subHeading,
  data,
  fieldProps,
  autoFocusTitle,
  directTo,
  fnCall,
}: AuthFormType<T>) => {
  const [fieldValue, setFieldValue] = useState(data);

  const onChangeHandeler = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue((props) => {
      return {
        ...props,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fnCall(fieldValue);
    setFieldValue(data);
  };

  const renderedItems = fieldProps.map(
    ({ label, id, type, title, placeholder }: AuthFieldPropsType) => {
      const value = fieldValue[title as keyof T] as string;

      return (
        <Fragment key={id}>
          <label
            className='text-grayDark text-base sm:text-lg  font-medium'
            htmlFor={id}
          >
            {label}
          </label>
          <input
            maxLength={title == 'phoneNo' ? 10 : undefined}
            autoFocus={title == autoFocusTitle}
            value={value}
            placeholder={placeholder}
            onChange={onChangeHandeler}
            className=' text-grayDark text-sm md:text-base  rounded-full px-[.6rem] py-[.55rem]  border outline-none'
            type={type}
            id={id}
            name={title}
            required
            min={title == 'password' ? '6' : '2'}
          />
        </Fragment>
      );
    }
  );

  return (
    <form className='flex flex-col gap-y-[.7rem]' onSubmit={onSubmitHandler}>
      {renderedItems}
      <Button extraClass='text-base sm:text-lg font-medium' type='submit' style='primary'>
        Submit
      </Button>
      <div className='text-sm   flex items-center '>
        <p className='text-grayDark'>{subHeading}</p>
        <Link className='cursor-pointer hover:scale-110' to={directTo}>
          &nbsp;
          <span className=''>{linkTitle}</span>
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
