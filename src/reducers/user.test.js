import { LOGIN, LOGOUT } from "../actions/actionTypes";

import user from "./user";

describe("Login reducer", () => {
  it("should return the initial state", () => {
    expect(user(undefined, {})).toEqual({
      isLoggedIn: false,
      name: "",
      surname: "",
      tag: "",
      remindMe: false
    });
  });

  it("should handle LOGIN", () => {
    expect(
      user([], {
        type: LOGIN,
        isLoggedIn: true,
        name: "Jorge",
        surname: "Martín",
        tag: "lifestyle",
        remindMe: true
      })
    ).toEqual({
      isLoggedIn: true,
      name: "Jorge",
      surname: "Martín",
      tag: "lifestyle",
      remindMe: true
    });
  });

  it("should handle LOGOUT", () => {
    expect(
      user([], {
        type: LOGOUT
      })
    ).toEqual({
      isLoggedIn: false,
      name: "",
      surname: "",
      tag: "",
      remindMe: false
    });
  });
});
