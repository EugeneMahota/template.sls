export const createUser = async (event) => {
  // console.log('createUser', event);
  console.log(process.env);
  console.log(process.env?.STAGE);
  console.log(process.env?.TEST_ENV);
  console.log(process.env?.BOOLEAN_ENV);
  return { message: 'Hi', };
};
