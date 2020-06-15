const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: "dbbphbyf8",
    api_key: 774835642655314,
    api_secret: "glquGGgcsab2IVTLWFXQY45z2Xs"
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}