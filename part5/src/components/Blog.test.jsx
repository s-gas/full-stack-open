import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
/*
test('renders only title and author', () => {
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

test('handler gets called twice when button is clicked twice', async () => {
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

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={user} likeBlog={mockHandler}/>)

  const u = userEvent.setup();
  const viewButton = screen.getByText("view");

  await u.click(viewButton);
  const likeButton = screen.getByText("like");

  await u.click(likeButton);
  await u.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2)
})
*/
