import 'babel-polyfill';
import mongoose from 'mongoose';

import Users from '../src/models/users';
import getUsersList from '../src/controllers/users/get-users';

const userData = { profile: { name: 'Allllan' }, email: 'Allllan@qbatch.com' };

describe('User Controllers Test', () => {


  // It's just so easy to connect to the MongoDB Memory Server 
  // By using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    });
  });


  it('create & save user successfully', async () => {
    const validUser = new Users(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
  });

  it('Get number of Users', async () => {
    jest.setTimeout(15000);
    return getUsersList({ skip: 0, limit: 0, filters: {} })
      .then((res) => {
        const { Users, total } = res;
        console.log(Users);
        const mockUser = [{
          profile: { name: Users[2].profile.name }, email: Users[2].email 
        }];
        expect(total).toBe(3);
        expect(mockUser).toMatchObject([userData]);
      });
  });


});




// expect(res.users).toBe([
//   {'_id': '5dd796e63331bd06020856d7', 'profile': {'name': 'alan'}, 'email': 'alan@gmail.com', 'emailVerificationToken': '987654321', 'emailVerified': 'true'}
// ]);
// .catch((err) => {
//   expect({res: 'total'}).toMatchObject({rees: 'total'});
// });
