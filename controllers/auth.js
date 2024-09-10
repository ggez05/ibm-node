import { compare_hashed_passwords, hashPassword } from "../utils/hashing.js";
import { createToken } from "../utils/tokens.js";

const users = [
  {
    id: 1,
    username: "garvit510bhatia@gmail.com",
    password: await hashPassword("password123"),
  },
];

export async function register(req, res) {
  try {
    const { username, password } = req.body;
    // Check if the user already exists
    const user = users.find((user) => user.username === username);
    console.log(user);
    if (user) {
      return res.json({ message: "This user is already registered!" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Add the new user to the static list
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };
    users.push(newUser);

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // Check if the user exists
    const user = users.find((user) => user.username === username);
    console.log(user);

    if (!user) {
      return res.json({ message: "Invalid Credentials!" });
    }

    // Compare the provided password with the stored hashed password
    const is_matched = await compare_hashed_passwords(password, user.password);
    console.log(is_matched);
    if (!is_matched) {
      return res.json({ message: "Invalid Credentials!" });
    }

    // Create a token for the logged-in user
    const token = createToken(user.id, username);

    return res.json({ message: "User logged in successfully!", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}
