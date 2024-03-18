// import { Box } from "@mui/material";
// import React, { useCallback, useEffect, useState } from "react";
// import Cookies from "js-cookie";

// interface Props {
//   userId: string;
// }
// const UserList = ({ userId }: Props) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const token = Cookies.get("token");

//   const URL = `http://localhost:5000/users/${userId}/following`;

//   const getUserList = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(URL, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       setTotalResults(data.totalPosts);
//       setPage((prevPage) => prevPage + 1);
//       dispatch(
//         setPosts({
//           postsList: [...posts, ...data.post],
//         })
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }

//     getUserList();
//   }, []);

//   return <Box></Box>;
// };

// export default UserList;
