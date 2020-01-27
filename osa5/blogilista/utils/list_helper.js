const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (sumLikes, item) => {
    return sumLikes + item.likes;
  }

  return blogs.reduce(reducer, 0);
}

module.exports = {
  dummy,
  totalLikes
}