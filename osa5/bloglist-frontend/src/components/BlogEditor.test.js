import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM, fireEvent } from '@testing-library/dom';

import BlogEditor from './BlogEditor';

describe('<BlogEditor /> ', () => {

  test('calls method that creates blog with given input data', () => {
    let createBlog = jest.fn();

    let component = render(<BlogEditor updateView={createBlog}/>);

    //Fill fields in Blog editor
    const titleField = component.container.querySelector('#titleField');
    fireEvent.change(titleField, {target: {value: 'Viimeinen keisari'}});

    const authorField = component.container.querySelector('#authorField');
    fireEvent.change(authorField, {target: {value: 'Konstantin Zelk'}});

    const urlField = component.container.querySelector('#urlField');
    fireEvent.change(urlField, {target: {value: 'zelk.com'}});

    // Submit form, create blog
    const blogEditorForm = component.container.querySelector('form');

    fireEvent.submit(blogEditorForm);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('Viimeinen keisari');
    expect(createBlog.mock.calls[0][0].author).toBe('Konstantin Zelk');
    expect(createBlog.mock.calls[0][0].url).toBe('zelk.com');

  });

});


