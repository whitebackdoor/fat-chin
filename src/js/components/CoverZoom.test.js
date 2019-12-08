import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

import CoverZoom from './CoverZoom';

configure({ adapter: new Adapter() });

describe('<CoverZoom />', () => {
    let wrapper = {};

    beforeEach(() => {
        wrapper = shallow(<CoverZoom />);
    });

    test('should render without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    test('should render a cover zoom with name and coverUrl', () => {
        wrapper.setProps({
            name: 'Hello',
            coverUrl: 'url',
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    test('should fire coverZoomHandler when clicked on a button', () => {
        const coverZoomHandler = jest.fn();

        wrapper.setProps({
            albumIndex: 7,
            coverZoomHandler,
        });

        const event = { target: { value: 'test' } };
        wrapper.find('.qa-cover-zomm__close').simulate('click', event.target.value, 7);

        expect(coverZoomHandler).toHaveBeenCalledWith(event.target.value, 7);
    });
});
