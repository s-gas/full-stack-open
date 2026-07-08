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

module.exports = {dummy, totalLikes, favoriteBlog}
