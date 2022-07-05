const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const users = mongoCollections.users;
const saltRounds = 16;

let exportedMethods = {
  async createUser(username, password) {
    const collection = await users();

    if (!username) throw `Error!! Please enter a username!`;
    if (typeof username !== "string")
      throw `Error!! Username is not a string!!`;
    username = username.trim();
    if (username.length === 0)
      throw `Error!! Username cannot just contain spaces`;

    if (username.length < 4)
      throw `Error!! Username should have atleast 4 characters!!`;

    if (!isNaN(username))
      throw `Error!! Invalid username!! It cannot contain only digits!!!`;

    var l_username = username.toLowerCase();

    if (!password) throw `Error!! Please Suplly a password`;
    if (typeof password !== "string") throw `Error!! Password must be a string`;
    password = password.trim();
    if (password.length === 0)
      throw `Error!! Password cannot just contain spaces`;

    if (password.length < 6)
      throw `Error!! Username should have atleast 6 characters!!`;

    const becypt_pass = await bcrypt.hash(password, saltRounds);

    let userData = {
      username: l_username,
      password: becypt_pass,
    };

    const data_available = await collection.findOne({ username: l_username });
    if (data_available) throw "Username already exists!!!";

    const inserData = await collection.insertOne(userData);

    return { userInserted: true };
  },
  async checkUser(username, password) {
    const collection = await users();

    if (!username) throw `Error!! Provide a username`;
    if (typeof username !== "string")
      throw `Error!! Username is not a string!!`;
    username = username.trim();
    if (username.length === 0)
      throw `Error!! Username cannot just contain spaces`;

    if (username.length < 4)
      throw `Error!! Username should have atleast 4 characters!!`;

    if (!isNaN(username))
      throw `Error!! Invalid username!! It cannot contain only digits!!!`;

    var l_username = username.toLowerCase();

    if (!password) throw `Error!! Please Suplly a password`;
    if (typeof password !== "string") throw `Error!! Password must be a string`;
    password = password.trim();
    if (password.length === 0)
      throw `Error!! Password cannot just contain spaces`;

    if (password.length < 6)
      throw `Error!! Username should have atleast 6 characters!!`;

    const data_available = await collection.findOne({ username: l_username });
    if (!data_available) throw "username or password is invalid";

    checkpass = await bcrypt.compare(password, data_available.password);
    if (!checkpass) throw "username or password is invalid";

    return { authenticated: true };
  },
};

module.exports = exportedMethods;
