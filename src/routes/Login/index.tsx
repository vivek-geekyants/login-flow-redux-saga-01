import { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import rootReducer from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import {
  CssBaseline,
  Container,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

interface UserInfo {
  email: string;
  password: string;
}

export const required = (input: any) => {
  if (!input || input === "") return "This field is required";
};

export const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const Login = () => {
  type RootStore = ReturnType<typeof rootReducer>;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootStore) => state.reduceUsers.userVariable
  );

  // useEffect(() => {
  //   const redirectUserTo = (param: string) => {
  //     navigate(param);
  //   };

  //   console.log(user);
  //   if (user.email) {
  //     redirectUserTo("/");
  //   }
  // }, [navigate, user]);

  const FormInput = ({ label, placeHolder, input, type, meta }: any) => (
    <FormControl className='mui-form-control'>
      <InputLabel className='mui-input-label'>{label}</InputLabel>
      <Input
        className='mui-input'
        {...input}
        type={input.type}
        placeholder={placeHolder}
      />
      {meta.touched && (
        <FormHelperText error={true}>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );

  const onSubmit = ({ email, password }: UserInfo) => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className='login'>
      {user?.email ? (
        <div data-testid='login-text'>
          <h2 className='reset-link'>welcome</h2>
        </div>
      ) : (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid }) => (
            <>
              <form onSubmit={handleSubmit} className='login-form-container'>
                <div className='field-container'>
                  <Field
                    name='email'
                    type='email'
                    label='Email'
                    placeHolder='Enter email'
                    component={FormInput}
                    validate={email}
                  />
                </div>
                <div className='field-container'>
                  <Field
                    name='password'
                    type='password'
                    component={FormInput}
                    label='Password'
                    placeHolder='Enter password'
                    validate={required}
                  />
                </div>
                <div className='field-container'>
                  <Button
                    data-testid='login-btn'
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disabled={invalid}
                    classes={{ disabled: "primary" }}
                  >
                    Go
                  </Button>
                </div>
                <div className='field-container'>
                  <Link className='reset-link' to='/signup'>
                    signup?
                  </Link>
                </div>
              </form>
            </>
          )}
        ></Form>
      )}
    </div>
  );
};

export default Login;
