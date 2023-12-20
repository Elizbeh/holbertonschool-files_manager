import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // check if password is provided
    if (!email) {
      return res.status(400).send({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }

    // check if email already exists
    const userExists = await dbClient.client.db().collection('users').findOne({ email });

    if (userExists) {
      return res.status(400).send({ error: 'Already exist' });
    }

    // Hash password using sha1
    const hashedPassword = sha1(password);

    // Create a new user
    const newUser = {
      id: sha1(email), // You can adjust this as per your requirement
      email,
      password: hashedPassword,
    };

    // Insert the new user into the database
    const addedUser = await dbClient.client.db().collection('users').insertOne(newUser);
    const id = addedUser.insertedId;

    return res.status(201).send({ id, email });
  }
}

export default UsersController;
