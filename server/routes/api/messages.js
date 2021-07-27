const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // find a conversation 
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (conversation && conversationId) {
      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    } else {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/:markMessageAsSeen", async (req, res, next) => {
  try {
    const { id } = req.params.id
    const message = await Message.update(
      { seen: true },
      { where: { id } }
    )
    return res.json(message)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
