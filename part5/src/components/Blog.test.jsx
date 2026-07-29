import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('unauthenticated users see only blog info and num of likes', () => {
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

  const user = null;

  render(<Blog blog={blog} user={user} />)

  const title = screen.getByText("author: title")
  const url = screen.queryByText("url");
  const likes = screen.queryByText("likes 1");
  const likeButton = screen.queryByRole("button", { name: "like" })
  const removeButton = screen.queryByRole("button", { name: "remove" })

  expect(title).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
  expect(likeButton).toBeNull();
  expect(removeButton).toBeNull();
})

test('authenticated users see also the like button', () => {
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
    username: "username2",
    name: "name2",
  };

  render(<Blog blog={blog} user={user} />)

  const title = screen.getByText("author: title")
  const url = screen.queryByText("url");
  const likes = screen.queryByText("likes 1");
  const likeButton = screen.queryByRole("button", { name: "like" })
  const removeButton = screen.queryByRole("button", { name: "remove" })

  expect(title).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
  expect(likeButton).toBeDefined();
  expect(removeButton).toBeNull();
})


test('the creator sees also the remove button', () => {
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
    username: "username1",
    name: "name1",
  };

  render(<Blog blog={blog} user={user} />)

  const title = screen.getByText("author: title")
  const url = screen.queryByText("url");
  const likes = screen.queryByText("likes 1");
  const likeButton = screen.queryByRole("button", { name: "like" })
  const removeButton = screen.queryByRole("button", { name: "remove" })

  expect(title).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
  expect(likeButton).toBeDefined();
  expect(removeButton).toBeDefined();
})
