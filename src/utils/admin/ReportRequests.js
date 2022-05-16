const createReports = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/reports`,
      {
        method: 'POST',
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

export { createReports };
