const bcrypt = require('bcrypt');


const saltRounds = 10;

const hash = (password, cb) =>
  bcrypt.hash(password, saltRounds, (err, res) => {
    if (err) {
      const error = {
        error: true,
        msg: err.toString(),
        code: 403,
        message: err.toString(),
      };
      return cb(error);
    }
    return cb(res);
  });
// const hash = 'abc';
const compare = (password, hash1, cb) =>
  bcrypt.compare(password, hash1, (err, res) => {
    if (err) {
      const error = {
        error: true,
        msg: err.toString(),
        code: 403,
        message: err.toString(),
      };
      return cb(error);
    }
    return cb(res);
  });


module.exports = {
  hash,
  compare,
};


// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

// res == true
// Store hash in your password DB. hash;

// const myPlaintextPassword = '12345678';
// const myPlaintextPassword1 = '123456789';