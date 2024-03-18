import { Stack, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import NameLink from "../CustomUI/NameLink";

const PostUserInfo = ({
  name,
  createdAt,
  postUserID,
}: {
  name: string;
  createdAt: Date;
  postUserID: string;
}) => {
  return (
    <Stack direction={"column"} alignItems={"start"}>
      <NameLink name={name} userId={postUserID} />
      <Tooltip title={createdAt.toDateString().toString()}>
        <Typography
          component="div"
          fontSize={"12px"}
          fontWeight={"300"}
          color={"grey"}
        >
          {moment(createdAt).fromNow()}
        </Typography>
      </Tooltip>
    </Stack>
  );
};

export default PostUserInfo;
