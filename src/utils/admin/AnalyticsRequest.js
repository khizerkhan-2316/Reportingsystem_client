const insertAnalyticsStats = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_SERVER_ENDPOINT}/api/analytics/stats`,
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

export { insertAnalyticsStats };
