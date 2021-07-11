import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const [unreadMessageCount, setUnreadMessageCount] = useState(0)
  const { conversation } = props;
  const { latestMessageText, otherUser, messages } = conversation;

  useEffect(() => {
    const countMessages = (messages) => {
      let newMessageCount = 0
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].seen === false) {
          newMessageCount = newMessageCount + 1
        }
        console.log(newMessageCount)
        setUnreadMessageCount(newMessageCount) 
      }
    }
    countMessages(messages)
  }, [messages])


  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
        { unreadMessageCount !== 0 ?
          <Typography className={classes.notification}>
            {unreadMessageCount}
          </Typography> : null
        }
      </Box>
    </Box>
  );
};

export default ChatContent;
