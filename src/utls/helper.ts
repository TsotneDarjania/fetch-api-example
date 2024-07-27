import fs from "fs";

export function getFile(path: string) {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data.toString());
      }
    });
  });
}
