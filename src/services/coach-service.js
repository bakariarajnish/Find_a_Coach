export async function fetchCoachesData() {
  const response = await fetch(
    'https://find-a-coach-e6fed-default-rtdb.firebaseio.com/coaches.json'
  );
  const responseData = await response.json();
  if (!response.ok) {
    const error = new Error(responseData.message || 'Unable to fetch data');
    throw error;
  }
  const coaches = [];
  for (let key in responseData) {
    const formattedCoachData = {
      id: key,
      ...responseData[key],
    };
    coaches.push(formattedCoachData);
  }
  return coaches;
}
