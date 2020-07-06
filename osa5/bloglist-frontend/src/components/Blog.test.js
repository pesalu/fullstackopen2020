import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM, fireEvent } from '@testing-library/dom';

import Blog from './Blog';

const blog = {
  title: 'Koiran päivät',
  author: 'Kalle Päätalo',
  url: 'kallepaatalo.com',
  likes: 5
};
const onClick = () => {
  console.log('Klikattu!');
};

test('renders title and author', () => {
  const component = render(<Blog blog={blog}  handleLikesIncrements={onClick} handleRemovalOfBlog={onClick}/>);
  // expect(component.container).toHaveTextContent('Koiran päivät Kalle Päätalo');
  const titleDiv = component.container.querySelector('.title');
  expect(titleDiv).toHaveTextContent('Koiran päivät');

  const authorDiv = component.container.querySelector('.author');
  expect(authorDiv).toHaveTextContent('Kalle Päätalo');

  const urlDiv = component.container.querySelector('.details');
  expect(urlDiv).toHaveStyle('display: none');

});

test('clicking title -div shows details (url and likes) of the blog', () => {
  const component = render(<Blog blog={blog}  handleLikesIncrements={onClick} handleRemovalOfBlog={onClick}/>);

  const titleDiv = component.container.querySelector('.title');
  fireEvent.click(titleDiv);

  const detailsDiv = component.container.querySelector('.details');
  expect(detailsDiv).not.toHaveStyle('display: none');
});

test('clicking like -button two times calls event handler twice', () => {
  const mockHandler = jest.fn();
  const component = render(<Blog blog={blog}  handleLikesIncrements={mockHandler} handleRemovalOfBlog={onClick}/>);

  const titleDiv = component.container.querySelector('.title');
  fireEvent.click(titleDiv);

  const likeButton = component.container.querySelector('.likeButton');

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
