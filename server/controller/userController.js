const User = require('../model/userModels')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {
  try {
    console.log('postman', req.body)
    const { username, email, password } = req.body
    const usernameCheck = await User.findOne({ username })

    if (usernameCheck) return res.json({ msg: 'UserName Used', status: false })

    const emailCheck = await User.findOne({ email })
    if (emailCheck)
      return res.json({ msg: 'Email already used', status: false })

    const hashedPassoword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      username,
      password: hashedPassoword,
    })

    delete user.password
    return res.json({ status: true, user })
  } catch (error) {
    next(error)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    console.log(req)
    const user = await User.findOne({ username })

    if (!user) {
      console.log(user)
      return res.json({ msg: 'Incorrect username or Password', status: false })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid)
      return res.json({ msg: 'Password Invalid', status: false })

    delete user.password

    return res.json({ status: true, user })
  } catch (error) {}
}

module.exports.setAvatar = async (req, res, next) => {
  console.log('abcd')
  try {
    const userId = req.params.id
    console.log(userId)
    const avatarImage = req.body.image
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    })
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarIamge,
    })
  } catch (error) {
    next(error)
  }
}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ])

    return res.json(users)
  } catch (error) {
    next(error)
  }
}
