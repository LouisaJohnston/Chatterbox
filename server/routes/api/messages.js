const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;

    // find a conversation
    let conversation = await Conversation.findConversation(
      userId,
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

router.get("/initial/:otherUserId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const user1 = req.user.id;
    const user2 = parseInt(Object.values(req.params));
    
    const conversation = await Conversation.findConversation(
      user1,
      user2
    )

    const convoMessages = await Message.findAll({
      where: {
        conversationId: await conversation.id
      },
      limit: 5,
      order: [["createdAt", "DESC"]]
    });

    const revMessages = convoMessages.reverse()
    res.json(revMessages)
  } catch (error) {
    next(error)
  }
});

router.get("/all/:otherUserId", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const user1 = req.user.id;
    const user2 = parseInt(Object.values(req.params));
    
    const conversation = await Conversation.findConversation(
      user1,
      user2
    )
    
    const convoMessages = await conversation.getMessages();
    res.json(convoMessages)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
