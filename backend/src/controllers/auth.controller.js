const { clerkClient, getAuth } = require("@clerk/express")
const app = require("../app")
const profileModel = require("../models/profile.model")

async function profileRegister(req, res) {

  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const isUser = await profileModel.findOne({ $or: [{ email }, { username }] })
  if (isUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const user = await clerkClient.users.createUser({
      emailAddress: [email],
      password: password,
    })

    const userProfile = await profileModel.create({
      clerkId: user.id,
      username,
      email,
      role
    })


    res.json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: error.errors
    })
  }

}

async function profileLogin(req, res) {

}

async function profileLogout(req, res) {

}

async function getProfile(req, res) {

  const { isAuthenticated, userId } = getAuth(req)

  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const user = await clerkClient.users.getUser(userId)

  res.json({ user })

}


module.exports = { profileRegister, profileLogin, profileLogout, getProfile }