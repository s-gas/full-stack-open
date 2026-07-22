const getUser = () => {
  const userJSON = window.localStorage.getItem('user');
  if (userJSON) {
    const user = JSON.parse(userJSON);
    return user;
  }
}

export default { getUser }
