import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
  }

  render(<Blog blog={blog} />)

  const titleAndAuthor = screen.getByText("title author");

  expect(titleAndAuthor).toBeDefined();

  const url = screen.queryByText("url");

  expect(url).toBeNull();

  const likes = screen.queryByText(1);

  expect(likes).toBeNull();
})
