import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions";
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

interface UserSignupInfo {
  email: string;
  name: string;
  password: string;
}

const Signup = () => {
  const dispatch = useDispatch();

  const FormInput = ({ label, placeHolder, input, meta }: any) => (
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

  const required = (input: any) => {
    if (!input || input === "") return "This field is required";
  };

  const email = (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email address"
      : undefined;

  const onSubmit = ({ email, name, password }: UserSignupInfo) => {
    dispatch(addUser({ email, name, password }));
  };
  return (
    <div className="signup">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid }) => (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="signup-form-container"
            >
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
                  name="name"
                  type="text"
                  component={FormInput}
                  label="Name"
                  placeHolder="Varun"
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
                <button type="submit" disabled={invalid}>
                  Signup
                </button>
              </div>
            </form>
          </>
        )}
      ></Form>
    </div>
  );
};

export default Signup;
