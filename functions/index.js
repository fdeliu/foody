const functions = require("firebase-functions");
const path = require("path");
const os = require("os");
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");

const {Storage} = require('@google-cloud/storage');

const gcs = new Storage({
  projectId: "your project id here",
  keyFilename: "your project filename here"
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bck = gcs.bucket("your bucket name here");
      bck
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          },
          predefinedAcl: 'publicRead'
        })
        .then((data) => {
          res.status(200).json({
            message: "Image uploaded successfully.",
            fileUrl: data[0].metadata.mediaLink
          });
        })
        .catch(err => {
          res.status(500).json({
            error: "Something went wrong on server!"
          });
        });
    });
    busboy.end(req.rawBody);
  });
});