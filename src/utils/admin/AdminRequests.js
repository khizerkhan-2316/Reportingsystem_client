const createAdmin = async (body) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/users/register-admin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem(
            process.env.REACT_APP_ADMIN_ACCESS_TOKEN_KEY
          ),
        },
        body: JSON.stringify(body),
      }
    );

    return response;
  } catch (e) {
    return e;
  }
};

export { createAdmin };
