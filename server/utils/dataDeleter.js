import path from "path";
import fs from "fs";

export const dataDeleter = (fileNames) => {
  return Promise.all(
    fileNames.map(async (fileName) => {
      try {
        const __dirname = path.resolve();
        const filePath = path.join(
          __dirname,
          `../server/uploads/postImages/${fileName}`
        );
        fs.unlink(filePath, (err) => {
          if (err) {
            throw err;
          }
          console.log("Delete File successfully.");
        });
      } catch (error) {
        console.log(error);
      }
    })
  );
};
