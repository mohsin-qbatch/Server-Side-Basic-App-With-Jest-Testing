import Users from '../../models/users';

const GetUserById = async ({ userId }) => {
  const user = await Users.findOne({ _id: userId });

  return user;
};

export default GetUserById;
