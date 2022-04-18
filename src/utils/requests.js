const getData = async (token, url) => {
  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

const UpdateUser = async (body, dealerId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/users/${dealerId}`,
      {
        method: 'PUT',
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

export { getData, UpdateUser };
