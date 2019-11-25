import 'babel-polyfill';
import mongoose from 'mongoose';

import Users from '../src/models/users';
import getUsersList from '../src/controllers/users/get-users';

const userData = { profile: { name: 'Tele' }, email: 'tele@gmail.com', loginUsing: 'Facebook' };

describe('User Model Test', () => {

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



  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new Users({ profile: { name: 'Telee' }, email: 'telee@gmail.com', nickname: 'Handsome TekLoon' });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.name).toBeUndefined();
    expect(savedUserWithInvalidField.gender).toBeUndefined();
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  });




  // Test Validation is working!!!
  // It should us told us the errors in on gender field.
  it('create user without required field should failed', async () => {
    const userWithoutRequiredField = new Users({ profile: { name: 'Tele' } });
    let err;
    try {
        const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
        error = savedUserWithoutRequiredField;
    } catch (error) {
        err = error
    }
    // console.warn({err});
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    // expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.email).toBeDefined();
  });

});



// test('the data is peanut butter', () => {
//   jest.setTimeout(30000);
//   const userExpected = {
//     profile: {
//       name: 'alan'
//     },
//     emailVerificationToken: '987654321',
//     email: 'alan@gmail.com',
//     emailVerified: true
//   };

//   return getUserById({ userId: '5dd796e63331bd06020856d7' }).then((res) => {
//     const userRecieved = {
//       profile: {
//         name: res.profile.name
//       },
//       email: res.email,
//       emailVerificationToken: res.emailVerificationToken,
//       emailVerified: res.emailVerified
//     };
//     expect(userRecieved).toMatchObject(userExpected);
//   });
// });

  