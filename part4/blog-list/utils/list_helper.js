const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((tot, cur) => {
    return cur.likes ? tot + cur.likes : tot;
  }, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return;
  return blogs.reduce((most, cur) => {
    if (cur.likes) {
      if (!most || cur.likes > most.likes) return cur;
    } else return most;
  }, undefined); 
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return;

  const authors = [];

  for (let blog of blogs) {
    let index = authors.findIndex((author) => author.author === blog.author)
    if (index != -1) {
      authors[index].blogs++;
    } else {
      authors.push({author: blog.author, blogs: 1});
    }
  }

  return authors.reduce((most, cur) => {
    if (!most || cur.blogs > most.blogs) return cur;
    else return most;
  }, undefined);
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs}
