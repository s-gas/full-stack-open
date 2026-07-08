const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns 1', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);

  assert.strictEqual(result, 1);
})

describe('total likes', () => {
  const totalLikes = listHelper.totalLikes;

  test('empty array', () => {
    assert.strictEqual(totalLikes([]), 0);
  });

  test('array with 1 element', () => {
    const blogs = [
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 2
      }
    ]

    assert.strictEqual(totalLikes(blogs), 2);
  });

  test('array with 2 elements', () => {
    const blogs = [
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 2
      },
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 3
      }
    ]

    assert.strictEqual(totalLikes(blogs), 5);
  });

  test('array where some elements do not have "likes" attribute', () => {
    const blogs = [
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 2
      },
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 3
      },
      {
        title: "x",
        author: "x",
        url: "x",
      },
    ]
  
    assert.strictEqual(totalLikes(blogs), 5);
  });
});

describe('favorite blog', () => {
  const favoriteBlog = listHelper.favoriteBlog;

  test('empty array', () => {
    assert.strictEqual(favoriteBlog([]), undefined);
  });

  test('array with 1 element', () => {
    const blogs = [
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 2
      }
    ]

    assert.deepStrictEqual(favoriteBlog(blogs), blogs[0]);
  });

  test('array with 2 elements', () => {
    const blogs = [
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 2
      },
      {
        title: "x",
        author: "x",
        url: "x",
        likes: 3
      },
    ]
    
    assert.deepStrictEqual(favoriteBlog(blogs), blogs[1]);
  });
});

describe('most blogs', () => {
  const mostBlogs = listHelper.mostBlogs;

  test('empty array', () => {
    assert.strictEqual(mostBlogs([]), undefined);
  });

  test('array with one element', () => {
    const blogs = [
      {
        title: "x",
        author: "x",
        url: "x",
      }
    ];

    const expected = {
      author: "x",
      blogs: 1
    };

    assert.deepStrictEqual(mostBlogs(blogs), expected);
  });

  test('array with 2 elements (same author)', () => {
    const blogs = [
      {
        title: "x",
        author: "x",
        url: "x",
      },
      {
        title: "x",
        author: "x",
        url: "x",
      },
    ];

    const expected = {
      author: "x",
      blogs: 2,
    };

    assert.deepStrictEqual(mostBlogs(blogs), expected);
  });
  
  test('array with 3 elements (2 of the same author)', () => {
    const blogs = [
      {
        title: "x",
        author: "x",
        url: "x",
      },
      {
        title: "x",
        author: "x",
        url: "x",
      },
      {
        title: "x",
        author: "y",
        url: "x",
      }
    ];

    const expected = {
      author: "x",
      blogs: 2,
    };

    assert.deepStrictEqual(mostBlogs(blogs), expected);
  });
});



