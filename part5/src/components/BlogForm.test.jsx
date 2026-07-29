import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { BrowserRouter } from 'react-router-dom';

test('event handler called with right details', async () => {
  const createBlog = vi.fn();

  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <BlogForm createBlog={createBlog} />
    </BrowserRouter>
  );

  const input = screen.getByLabelText('title:')
  const button = screen.getByRole('button', { name: 'create' })

  await user.type(input, "hello");
  await user.click(button);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toBe("hello");
});
