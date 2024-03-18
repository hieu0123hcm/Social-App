import Cookies from "js-cookie";
import { useState } from "react";
import Error from "../../components/CustomUI/Error";
import Spinner from "../../components/CustomUI/Spinner";
import { useAppDispatch } from "../../custom-hook/useReduxHooks";

const ProfileFeed = ({ userId }: { userId: string | undefined }) => {
  // const postsByUserId = useAppSelector(
  //   (state) => state.posts.postsListByUserID
  // );
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const getPostsByUserId = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetchData<PostResponse>(
  //         `http://localhost:5000/posts/${userId}`,
  //         token
  //       );
  //       const { success, data } = response.data;
  //       console.log(data);
  //       if (success) {
  //         dispatch(setPostsByUserID({ postsListByUserID: data.posts }));
  //       }
  //     } catch (error) {
  //       const formattedError = error as AxiosError;
  //       setError(
  //         (formattedError.response?.data as string) || "Error getting the data"
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getPostsByUserId();
  // }, [token, dispatch, userId]);

  return (
    <>
      {error ? <Error message={error} /> : null}
      {isLoading ? <Spinner /> : null}
      {/* <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
        {postsByUserId.map((item: Post) => (
          <ImageListItem key={item.picturePath[0]}>
            <img
              src={`http://localhost:5000/post-images/${item.picturePath[0]}`}
              style={{
                maxWidth: "100%",
              }}
              loading="lazy"
              alt="Your Image"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
    </>
  );
};

export default ProfileFeed;
