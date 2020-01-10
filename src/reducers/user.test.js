import { LOGIN, LOGOUT } from "../utils/actionTypes";

import login from "./login";

describe("Login reducer", () => {
  it("should return the initial state", () => {
    expect(login(undefined, {})).toEqual({
      isLoggedIn: false,
      name: "",
      surname: "",
      tag: ""
    });
  });

  it("should handle LOGIN", () => {
    expect(
      login([], {
        type: LOGIN,
        name: "Jorge",
        surname: "Martín",
        tag: "lifestyle"
      })
    ).toEqual({
      isLoggedIn: true,
      name: "Jorge",
      surname: "Martín",
      tag: "lifestyle"
    });
  });

  it("should handle LOGOUT", () => {
    expect(
      login([], {
        type: LOGOUT
      })
    ).toEqual({
      isLoggedIn: false,
      name: "",
      surname: ""
    });
  });
});
