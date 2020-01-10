import React from "react";
import { shallow } from "enzyme";

import Home from "./Home";
import AdvertList from "../AdvertList";
import Filter from "../Filter/Filter";

describe("Home component test", () => {
  const defaultProps = {
    adverts: {
      adverts: [1, 2, 3],
      ui: {
        isFetching: true
      }
    },
    loginUser: jest.fn(),
    user: {
      isLoggedIn: true
    },
    fetchAdverts: jest.fn(),
    history: {
      push: jest.fn()
    }
  };

  const render = props => shallow(<Home {...defaultProps} />);
  let wrapper;

  beforeEach(() => {
    wrapper = render();
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the filter component", () => {
    expect(wrapper.find(Filter).props().onFilterChange).toHaveLength(1);
  });

  it("should render the AdvertList component", () => {
    expect(wrapper.find(AdvertList).props().adverts).toHaveLength(3);
  });
});
