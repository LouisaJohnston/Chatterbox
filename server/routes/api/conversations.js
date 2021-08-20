const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const userSocketIdMap = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;

    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      include: [
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      console.log("DONKEY", convoJSON);

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (userSocketIdMap.has[convoJSON.otherUser.id]) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      const latestMessage = await Message.findAll({
        limit: 1,
        where: {
          conversationId: convoJSON.id,
        },
        order: [["createdAt", "DESC"]],
      });

      const messageJSON = latestMessage[0].toJSON();

      const getCount = await Message.count({
        where: {
          seen: false,
          conversationId: convoJSON.id,
          senderId: {
            [Op.not]: userId,
          },
        },
      });

      convoJSON.unSeenMessageCount = getCount;
      convoJSON.latestMessageText = messageJSON.text;
      convoJSON.latestMessageId = messageJSON.id;
      conversations[i] = convoJSON;
    }
    const sortedConvos = conversations.sort(
      (a, b) => b.latestMessageId - a.latestMessageId
    );
    res.json(sortedConvos);
  } catch (error) {
    next(error);
  }
});

router.put("/seen/:conversationId", async (req, res, next) => {
  try {
    const id = parseInt(Object.values(req.params));
    const userId = req.user.id;
    const foundConvo = await Conversation.findOne({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
        id: id,
      },
    });
    if (!req.user || !foundConvo) {
      return res.sendStatus(401);
    } else {
      const messages = await Message.update(
        { seen: true },
        {
          where: {
            seen: false,
            conversationId: id,
            senderId: {
              [Op.not]: userId,
            },
          },
          returning: true,
          plain: true,
        }
      );
      res.statusCode = 200;
      res.json(messages);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
