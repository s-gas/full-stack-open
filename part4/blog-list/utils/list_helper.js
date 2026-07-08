const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((tot, cur) => {
    return cur.likes ? tot + cur.likes : tot;
  }, 0);
}

module.exports = {dummy, totalLikes}
