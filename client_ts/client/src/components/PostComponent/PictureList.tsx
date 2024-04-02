import { Box } from "@mui/material";
import React, { useState } from "react";
import { Post } from "../../model/post.model";
import PictureModal from "./PictureModal";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Pagination } from "swiper/modules";

interface Props {
  picturePath: Post["picturePath"];
}

const PictureList: React.FC<Props> = ({ picturePath }) => {
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [item, setItem] = useState("");

  return (
    <Box>
      {isPictureModalOpen && (
        <PictureModal
          isOpening={isPictureModalOpen}
          onClose={() => {
            setIsPictureModalOpen(false);
          }}
          item={item}
        />
      )}
      <Swiper
        style={{
          zIndex: 0,
        }}
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Keyboard, Navigation, Pagination]}
      >
        {picturePath.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              key={index}
              width={"100%"}
              height={"100%"}
              src={`http://localhost:5000/post-images/${item}`}
              srcSet={`http://localhost:5000/post-images/${item}`}
              loading="lazy"
              style={{
                borderRadius: "15px",
              }}
              onClick={() => {
                setIsPictureModalOpen(true);
                setItem(item);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PictureList;
