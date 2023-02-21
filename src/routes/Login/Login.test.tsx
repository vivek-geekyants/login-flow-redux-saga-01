import React from "react";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Login from ".";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { server } from "../../mocks/server";
import { store } from "../../redux/reducers";
import { wait } from "@testing-library/user-event/dist/utils";
const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? false
    : true;

describe("login", () => {
  test("users screen before login", async () => {
    const initialState = {
      reduceUsers: {
        userVariable: {
          name: "",
          email: "",
        },
      },
    };
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    userEvent.type(screen.getByPlaceholderText("Enter email"), "test@test.com");
    userEvent.type(screen.getByPlaceholderText("Enter password"), "qwerty");
    userEvent.click(screen.getByTestId("login-btn"));
  });
  test("users screen after login", async () => {
    const initialState = {
      reduceUsers: {
        userVariable: {
          name: "Varun",
          email: "vivekl@geekyants.com",
        },
      },
    };
    const mockStore = configureStore();
    let store;
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("login-text")).toBeInTheDocument();
  });

  test("wrong response is not passed returns 401", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>
      );
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(
        screen.getByPlaceholderText("Enter email"),
        "vivekl@geekyants.com"
      );
      userEvent.type(screen.getByPlaceholderText("Enter password"), "viv");
      userEvent.click(screen.getByTestId("login-btn"));
    });

    await new Promise((r) => setTimeout(r, 2000));

    // verify the store was populated
    act(() => {
      expect(store.getState().reduceUsers.userVariable).toStrictEqual({
        name: "",
        email: "",
      });
    });
  });

  test("wrong response is not passed returns 403", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>
      );
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(
        screen.getByPlaceholderText("Enter email"),
        "test@test.com"
      );
      userEvent.type(screen.getByPlaceholderText("Enter password"), "vivekl");
      userEvent.click(screen.getByTestId("login-btn"));
    });

    await new Promise((r) => setTimeout(r, 2000));

    // verify the store was populated
    act(() => {
      expect(store.getState().reduceUsers.userVariable).toStrictEqual({
        name: "",
        email: "",
      });
    });
  });
  test("fetches data and updates the store", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>
      );
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(
        screen.getByPlaceholderText("Enter email"),
        "vivekl@geekyants.com"
      );
      userEvent.type(screen.getByPlaceholderText("Enter password"), "vivekl");
      userEvent.click(screen.getByTestId("login-btn"));
    });

    await new Promise((r) => setTimeout(r, 2000));

    // verify the store was populated
    act(() => {
      expect(store.getState().reduceUsers.userVariable).toStrictEqual({
        name: "Varun",
        email: "vivekl@geekyants.com",
      });
    });
  });

  test("validate function should pass on correct input", () => {
    const text = "text@test.com";
    expect(email(text)).toBe(true);
  });
  test("validate function should fail on incorrect input", () => {
    const text = "text";
    expect(email(text)).not.toBe(true);
  });
});
