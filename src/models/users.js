import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  profile: {
    name: String
  },
  email: { type: String, unique: true, required: true },
  password: String,
  emailVerificationToken: String,
  emailVerified: Boolean
}, { timestamps: true });

// UserSchema.pre('save', async function (next) {
//   const user = this;
//   //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
//   const hash = await bcrypt.hash(user.password, 10);
//   //Replace the plain text password with the hash and then store it
//   user.password = hash;
//   //Indicates we're done and moves on to the next middleware
//   next();
// });

// //We'll use this to make sure that the user trying to log in has the correct credentials
// UserSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//   //Hashes the password sent by the user for login and checks if the hashed password stored in the
//   //database matches the one sent. Returns true if it does else false.
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// }

export default mongoose.model('users', UserSchema, 'users');
