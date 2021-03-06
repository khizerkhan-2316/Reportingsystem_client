const insertCriteoStats = async (token, url, type) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}${url}`,
      {
        method: type,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );

    return response;
  } catch (e) {
    return e;
  }
};

export { insertCriteoStats };
