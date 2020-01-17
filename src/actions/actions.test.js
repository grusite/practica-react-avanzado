import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import * as TYPES from "./actionTypes";
import * as advertServices from "../services/AdsAPIService";
jest.mock("../services/AdsAPIService");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe("actions", () => {
  it("should create a LOGIN action", () => {
    const name = "Jorge";
    const surname = "Martín";
    const tag = "lifestyle";

    const expectedAction = {
      type: TYPES.LOGIN,
      name,
      surname,
      tag
    };

    expect(actions.login(name, surname, tag)).toEqual(expectedAction);
  });

  it("should create a LOGOUT action", () => {
    const expectedAction = {
      type: TYPES.LOGOUT
    };

    expect(actions.logout()).toEqual(expectedAction);
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
    const dispatch = jest.fn();

    advertServices.filterAdverts
      .mockResolvedValueOnce(adverts)
      .mockRejectedValueOnce(error);

    beforeEach(() => {
      dispatch.mockClear();
    });

    beforeEach(() => {
      store.clearActions();
    });

    describe("when getAdverts resolves", () => {
      it("should dispatch success action using store mock function", async () => {
        const expectedActions = [
          {
            type: TYPES.FETCH_ADVERTS_REQUEST
          },
          {
            type: TYPES.FETCH_ADVERTS_SUCCESS,
            adverts
          }
        ];

        await store.dispatch(actions.fetchAdverts());
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    describe("when getAdverts rejectes", () => {
      it("should dispatch failure action using dispatch mock function", async () => {
        await actions.fetchAdverts()(dispatch, adverts);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: TYPES.FETCH_ADVERTS_REQUEST
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: TYPES.FETCH_ADVERTS_FAILURE,
          error
        });
      });
    });
  });
});
