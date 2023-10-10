import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import { userEvent } from '@testing-library/user-event';

const testShows = {
    name: 'test name', 
    summary: 'test summary', 
    seasons: [ {
            id:0, 
            name: '', 
            episodes: [] },
        {
            id:1, 
            name: '', 
            episodes: [] }]
};

test('renders without errors', () => {
    render(<Show shows={testShows}/>)
    //console.log(testShows);
 });

test('renders Loading component when prop show is null', () => { 
    render(<Show shows={null}/>)
    const loading = screen.queryByTestId('loading-container');
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show shows={testShows} selectedSeason={'none'}/>)
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(0);
});

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn();
    render(<Show shows={testShows} selectedSeason={'none'} handleSelect={handleSelect} />);
    const select = screen.getByLabelText(/select a season/i);
    userEvent.selectOptions(select, ['0'] );

    expect(handleSelect).toBeCalled();
 });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show shows={testShows} selectedSeason={'none'} />);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();
 
    rerender(<Show show={testShows} selectedSeason={1} />)
    expect(episodes).toBeInTheDocument();
 });
