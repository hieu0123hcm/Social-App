import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
} from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { COLORS } from "../../constants/Constant";

interface Props {
  image: File[];
  setImage: React.Dispatch<React.SetStateAction<File[]>>;
  multipleUpload?: boolean;
}

const Dropzone: React.FC<Props> = ({ image, setImage, multipleUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          const img = new Image();
          img.src = reader.result as string;

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

            const size = Math.min(img.width, img.height);
            canvas.width = size;
            canvas.height = size;

            // Calculate the x and y coordinates to make the image centered in the square
            const x = (img.width - size) / 2;
            const y = (img.height - size) / 2;

            ctx.drawImage(img, x, y, size, size, 0, 0, size, size);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const newFile = new File([blob], Date.now() + file.name, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  });
                  setImage((prev) => [...prev, newFile]);
                }
              },
              "image/jpeg",
              0.95
            );
          };
        };

        reader.readAsDataURL(file);
      });
    },
    [setImage]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    multiple: multipleUpload,
    onDrop,
  });

  return (
    <Stack flexDirection={"column"}>
      {image.length > 0 && (
        <ImageList
          id="preview-image-list"
          sx={{
            overflowX: "auto",
          }}
        >
          <ImageListItem
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            {image.map((item, index) => (
              <img
                key={index}
                src={URL.createObjectURL(item)}
                alt={item.name}
                loading="lazy"
                style={{ height: "160px", borderRadius: "0.7rem" }}
              />
            ))}
          </ImageListItem>
        </ImageList>
      )}
      <Stack flexDirection={"row"}>
        <Box
          {...getRootProps()}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          border={`2px dashed ${COLORS.lime}`}
          borderRadius={"0.7rem"}
          width="100%"
          bgcolor={COLORS.purewhite}
          color={COLORS.black}
          sx={{
            "&:hover": {
              cursor: "pointer",
              border: `2px dashed ${COLORS.lime}`,
              bgcolor: COLORS.lightgrey,
            },
          }}
        >
          <input {...getInputProps()} />
          <span>Add Image Here</span>
        </Box>
        {image && (
          <IconButton
            onClick={() => setImage([])}
            sx={{
              width: "15%",
              "&:hover": { color: COLORS.black, background: COLORS.white },
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default Dropzone;
