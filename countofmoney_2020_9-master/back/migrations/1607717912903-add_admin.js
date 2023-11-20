const { Administration, User } = require('../models');
const bcrypt = require("bcrypt-nodejs");


/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  console.log("[INFO] Migration Administration..");
  await Administration.create({name: "config", article: 10, crypto: 10});
  console.log("[INFO] Migration Admin User..");
  const password = process.env.PASSWORD_ADMIN;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, null, function(err, passwordHash) {
        User.create([{
            email: "admin@crypto.com",
            password: passwordHash,
            name: 'Admin42421',
            role: 'Admin',
        }])
    });
});
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  console.log("[INFO] Deleting Admin config...")
  await Administration.findOneAndDelete({name: "config"});
  console.log("[INFO] Deleting Admin user...")
  await User.findOneAndDelete({name: 'Admin42421'}, function(err, found) {
    if (err) {
      console.log("[ERROR]", err);
    }
    else if (found) {
      console.log("[INFO] admin user as deleted.");
    }
    else {
      console.log("[INFO] admin not found");
    }
  });
}

module.exports = { up, down };
