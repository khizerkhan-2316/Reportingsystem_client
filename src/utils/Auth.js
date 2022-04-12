const submitHandler = async (username, password, url) => {
  const credentials = {
    username,
    password,
  };

  const bodyData = JSON.stringify(credentials);

  try {
    const request = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },

      body: bodyData,
    });

    const data = await request.json();

    return data;
  } catch (e) {
    return e;
  }
};

const addAccessToken = (response) => {
  response.role === process.env.REACT_APP_USER_ROLE
    ? localStorage.setItem(
        process.env.REACT_APP_USER_ACCESS_TOKEN_KEY,
        response.token
      )
    : localStorage.setItem(
        process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY,
        response.token
      );
};

const validatedCredentials = (username, password) => {
  return username === '' || password === '' ? false : true;
};

const isAuthenticated = (role) => {
  return localStorage.getItem(role) === null
    ? false
    : JSON.parse(localStorage.getItem(role));
};

const checkUserAuth = (role) => {
  return localStorage.getItem(role) === null
    ? null
    : JSON.parse(localStorage.getItem(role));
};

export {
  submitHandler,
  validatedCredentials,
  isAuthenticated,
  addAccessToken,
  checkUserAuth,
};
