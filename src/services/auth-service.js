export async function authenticateUser(data, requestType) {
  const API_KEY = '';
  let URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  if (requestType === 'login') {
    URL =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  }

  const response = await fetch(URL + API_KEY, {
    method: 'post',
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      responseData.error.message ||
        'Unable to authenticate. Please try again or later.'
    );
  }
  return responseData;
}
