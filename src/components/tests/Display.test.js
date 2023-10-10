import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import Show from '../Show';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

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

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(testShows);
    render(<Display />)
    const button = screen.getByRole('button');

    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShows);
    render(<Display />)
    const button = screen.getByRole('button');
    
    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(2);
    })
 });
