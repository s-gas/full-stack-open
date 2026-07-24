import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author', () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
    user: {
      username: "username",
      name: "name",
    },
  }

  const user = {
    username: "username",
    name: "name",
  }

  render(<Blog blog={blog} user={user}/>)

  const titleAndAuthor = screen.getByText("title author");

  expect(titleAndAuthor).toBeDefined();

  const url = screen.queryByText("url");

  expect(url).toBeNull();

  const likes = screen.queryByText(1);

  expect(likes).toBeNull();
})

test('url and likes visible after button click', async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
    user: {
      username: "username",
      name: "name",
    },
  }

  const user = {
    username: "username",
    name: "name",
  }

  render(<Blog blog={blog} user={user}/>)


  const u = userEvent.setup();
  const button = screen.getByText("view");

  await u.click(button);

  const url = screen.getByText("url");
  const likes = screen.getByText("likes 1");

  expect(button).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
})
