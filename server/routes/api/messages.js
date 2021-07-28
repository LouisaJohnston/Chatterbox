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
      console.log(message)
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
    const id  = parseInt(Object.values(req.params));
    const messages = await Message.update(
      { seen: true },
      { where: { id },
      returning: true,
      plain: true,
    },
    );
    for (let i = 0; i < messages.length; i++) {
      console.log("PAI", messages[i])
    }
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
