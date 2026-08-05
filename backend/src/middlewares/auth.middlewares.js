const { clerkMiddleware, clerkClient, getAuth } = require('@clerk/express')

const AuthenticateUser =  async (req,res) =>{
const { isAuthenticated, userId } = getAuth(req)

  // If user isn't authenticated, return a 401 error
  if (!isAuthenticated) {
    res.status(401).json({ error: 'User not authenticated' })
    return
  }

  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  res.json({ user })
}