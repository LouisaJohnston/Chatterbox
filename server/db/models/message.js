const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  seen: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

Message.findMessage = async function (id) {
  const message = await Message.findOne({
    where: {
        messageId: id
    }
  });
  return message;
};

module.exports = Message;
