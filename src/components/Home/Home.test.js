import React from "react";
import { shallow } from "enzyme";

import Home from "./Home";
import Navbar from "../Navbar";
import AdvertList from "../AdvertList";
import Filter from "../Filter";

describe("Home component test", () => {
  const defaultProps = {
    adverts: {
      adverts: [1, 2, 3]
    },
    ui: {
      isFetching: true
    },
    loginUser: jest.fn(),
    user: {
      tag: "lifestyle"
    },
    fetchAdverts: jest.fn()
  };

  const render = () => shallow(<Home {...defaultProps} />);
  let wrapper;

  beforeEach(() => {
    wrapper = render();
  });

  it("should render Home comp", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Navbar component", () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });

  it("should render Filter component", () => {
    expect(wrapper.find(Filter).props().onFilterChange).toHaveLength(1);
  });

  it("should render AdvertList component", () => {
    expect(wrapper.find(AdvertList).props().adverts).toHaveLength(3);
  });
});
