import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as TYPES from "./actionTypes";
import * as advertServices from "../services/AdsAPIService";
jest.mock("../services/AdsAPIService");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const dispatch = jest.fn();
const history = { push: jest.fn() };

describe("actions", () => {
  it("should execute LOGIN action and push to home", () => {
    const name = "Jorge";
    const surname = "Martín";
    const tag = "lifestyle";

    const expectedAction = {
      type: TYPES.LOGIN,
      name,
      surname,
      tag
    };

    actions.userLogin(name, surname, tag)(dispatch, store.getState, {
      history
    });

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
    expect(history.push).toHaveBeenCalledWith("/");
  });

  it("should create a LOGOUT action", () => {
    const expectedAction = {
      type: TYPES.LOGOUT
    };

    actions.userLogout()(dispatch, store.getState, {
      history
    });

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
    expect(history.push).toHaveBeenCalledWith("/");
  });

  it("should create a Fetching Request action", () => {
    const expectedAction = {
      type: TYPES.FETCH_ADVERTS_REQUEST
    };

    expect(actions.fetchAdvertsRequest()).toEqual(expectedAction);
  });

  it("should create a Fetching Success action", () => {
    const adverts = [
      {
        createdAt: "2019-11-29T20:56:55.724Z",
        description: "Test1",
        name: "Test1",
        photo: "test1.jpg",
        price: 200,
        tags: ["lifestyle"],
        type: "buy",
        updatedAt: "2019-11-29T20:56:55.724Z",
        __v: 0,
        _id: "5de18617f620e321a4126875"
      },
      {
        createdAt: "2019-11-29T20:56:55.724Z",
        description: "Test2",
        name: "Test2",
        photo: "test2.jpg",
        price: 100,
        tags: ["lifestyle"],
        type: "buy",
        updatedAt: "2019-11-29T20:56:55.724Z",
        __v: 0,
        _id: "5de18617f620e321a4126875"
      }
    ];
    const expectedAction = {
      type: TYPES.FETCH_ADVERTS_SUCCESS,
      adverts
    };

    expect(actions.fetchAdvertsSuccess(adverts)).toEqual(expectedAction);
  });

  it("should create a Fetching Failure action", () => {
    const error = "Error fetching adverts";
    const expectedAction = {
      type: TYPES.FETCH_ADVERTS_FAILURE,
      error
    };

    expect(actions.fetchAdvertsFailure(error)).toEqual(expectedAction);
  });

  describe("fetchAdverts", () => {
    const adverts = [1, 2, 3];
    const error = "Error fetching adverts";

    const getAdverts = advertServices.filterAdverts
      .mockResolvedValueOnce(adverts)
      .mockRejectedValueOnce(error);

    describe("when getAdverts resolves", () => {
      const params = "tag=lifestyle";
      actions.fetchAdverts(params)(dispatch);

      it("should dispatch request action using store mock function", async () => {
        const expectedRequestActions = {
          type: TYPES.FETCH_ADVERTS_REQUEST
        };

        expect(dispatch).toHaveBeenNthCalledWith(1, expectedRequestActions);
      });

      it("should call api service", () => {
        expect(getAdverts).toHaveBeenCalled();
      });

      it("should dispatch success action using store mock function", async () => {
        const expectedSuccessActions = {
          type: TYPES.FETCH_ADVERTS_SUCCESS,
          adverts
        };

        expect(dispatch).toHaveBeenNthCalledWith(3, expectedSuccessActions);
      });
    });

    describe("when getAdverts rejectes", () => {
      const params = "tag=lifestyle";
      actions.fetchAdverts(params)(dispatch);

      it("should dispatch request action using store mock function", async () => {
        const expectedRequestActions = {
          type: TYPES.FETCH_ADVERTS_REQUEST
        };

        expect(dispatch).toHaveBeenNthCalledWith(1, expectedRequestActions);
      });

      it("should dispatch failure action using dispatch mock function", async () => {
        const expectedFailureActions = {
          type: TYPES.FETCH_ADVERTS_FAILURE,
          error
        };

        expect(dispatch).toHaveBeenNthCalledWith(4, expectedFailureActions);
      });
    });
  });
});
