import {
  Box,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Comment } from "../../../model/comment.model";
import CustomAvatar from "../../CustomUI/UserAvatar";
import NameLink from "../../CustomUI/NameLink";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const createDate = new Date(comment.createdAt);

  return (
    <ListItem
      key={comment._id}
      sx={{
        gap: "10px",
        padding: "5px 0",
      }}
    >
      <CustomAvatar
        userId={comment.owner._id}
        picturePath={comment.owner.picturePath}
      />

      <ListItemText
        primary={
          <Stack direction={"row"} gap={"5px"}>
            <NameLink
              name={`${comment.owner.firstName} ${comment.owner.lastName}`}
              userId={comment.owner._id}
            />
            <Typography fontSize={"14px"} fontWeight={"100"} color={"grey"}>
              {moment(createDate).fromNow()}
            </Typography>
          </Stack>
        }
        secondary={
          <Tooltip title={createDate.toString()}>
            <Box>
              <Typography
                component="div"
                fontSize={"14px"}
                color={"black"}
                sx={{ wordBreak: "break-word" }}
              >
                {comment.comment}
              </Typography>
            </Box>
          </Tooltip>
        }
      />
    </ListItem>
  );
};

export default CommentItem;
