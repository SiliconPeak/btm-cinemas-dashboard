import fs from "fs"

//Delete images
export const deleteImage = (image) => {
    return new Promise((resolve, reject) => {
        let path = process.cwd() + "/public/uploads/" + image;

        if (path) {
            try {
                fs.unlink(path, (err, success) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(success);
                    }
                })
            } catch (err) {
                reject(err);
            }
        }
    })
}