const getUserToken = async () => {
  const endpointAPI = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(endpointAPI);
  const tokenApi = await request.json();
  return tokenApi;
};

const fetchQuestions = async (token) => {
  const questionEndpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(questionEndpoint);
  const response = await request.json();
  return response;
};

export {
  getUserToken,
  fetchQuestions,
};
