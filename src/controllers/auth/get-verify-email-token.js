import Users from '../../models/users';

/**
 * GET /account/verify/:token
 * Verify email address
 */

const verifyEmailToken = (req, res, next) => {
  const { token } = req.params;

  Users.findOne({ emailVerificationToken: token })
      .then((user) => {
        if (!user) {
          req.flash('errors', { msg: 'There was an error in loading your profile.' });
        }
        user.emailVerificationToken = '';
        user.emailVerified = true;
        user = user.save();
        req.flash('info', { msg: 'Thank you for verifying your email address.' });
      })
      .catch((error) => {
        console.log('Error saving the user profile to the database after email verification', error);
        req.flash('error', { msg: 'There was an error when updating your profile.  Please try again later.' });
        return res.redirect('/account');
      });
};

export default verifyEmailToken;
