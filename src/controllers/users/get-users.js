import users from '../../models/users';

const getUsersList = async ({ skip, limit, filters }) => {
  const total = await users.find().countDocuments();
  const Users = await users
    .find(filters)
    .skip(skip)
    .limit(limit);
  return { Users, total };
  // console.warn('getUsersList`', total);
  // return { total: 152 };

};

export default getUsersList;
