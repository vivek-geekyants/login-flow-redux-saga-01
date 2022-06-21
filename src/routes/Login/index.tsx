import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import types from "../../utils/actionTypes";

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

const Login = () => {
  const dispatch = useDispatch();

  const FormInput = ({ label, placeHolder, input, type, meta }: any) => (
    <FormControl className="mui-form-control">
      <InputLabel className="mui-input-label">{label}</InputLabel>
      <Input
        className="mui-input"
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
    console.log("submit");
    dispatch(loginUser({ email, password }));
  };

  const required = (input: any) => {
    if (!input || input === "") return "This field is required";
  };

  const email = (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email address"
      : undefined;

  return (
    <div className="login">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid }) => (
          <>
            <form onSubmit={handleSubmit} className="login-form-container">
              <div className="field-container">
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  placeHolder="Enter email"
                  component={FormInput}
                  validate={required}
                />
              </div>
              <div className="field-container">
                <Field
                  name="password"
                  type="password"
                  component={FormInput}
                  label="Password"
                  placeHolder="Enter password"
                  validate={required}
                />
              </div>
              <div className="field-container">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={invalid}
                  classes={{ disabled: "primary" }}
                >
                  Go
                </Button>
              </div>
              <div className="field-container">
                <Link className="reset-link" to="/signup">
                  signup?
                </Link>
              </div>
            </form>
          </>
        )}
      ></Form>
    </div>
  );
};

export default Login;
