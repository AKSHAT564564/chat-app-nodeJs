const {
  addMessage,
  getAllMessage,
} = require('../controller/messagesController')

const router = require('express').Router()

router.post('/addMessage', addMessage)
router.post('/getAllMessage', getAllMessage)

module.exports = router
