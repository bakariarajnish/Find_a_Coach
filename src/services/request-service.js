export async function saveRequestData(data) {
  return handleRequest(data, '');
}

export async function getRequestsData(coachId, token) {
  const allRequests = await handleRequest({}, token);
  const parseRequest = [];
  for (let key in allRequests) {
    const request = {
      id: key,
      ...allRequests[key],
    };
    parseRequest.push(request, token);
  }
  const filteredRequest = parseRequest.filter(
    (request) => request.coachId === coachId
  );
  return filteredRequest;
}

async function handleRequest(data, vToken) {
  const objLength = Object.keys(data).length;
  let URL =
    'https://find-a-coach-e6fed-default-rtdb.firebaseio.com/requests.json';
  URL = objLength === 0 ? URL + '?auth=' + vToken : URL;
  const response = await fetch(
    URL,
    objLength === 0
      ? { method: 'get' }
      : { method: 'post', body: JSON.stringify(data) }
  );
  const responseData = await response.json();
  if (!response.ok) {
    const error = new Error(
      responseData.error?.message || objLength === 0
        ? 'Unable to fetch data'
        : 'Unable to save data'
    );
    throw error;
  }

  return responseData;
}
