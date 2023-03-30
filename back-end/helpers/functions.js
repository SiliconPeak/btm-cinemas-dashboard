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
export const apiListResponse = (status = null, data = null, message = null) => {
    const response = {
        status: status,
        data: data,
        message: message
    };
    return response;
}

export const apiErrorResponse = (status = null, error = null) => {
    const response = {
        status: status,
        error: error
    }
    return response;
}

export const apiSuccessResponse = (status = null, message = null) => {
    const response = {
        status: status,
        message: message
    }
    return response;
}