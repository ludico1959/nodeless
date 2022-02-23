"use strict";

const AWS = require("aws-sdk");
const { basename, extname } = require("path");
const sharp = require("sharp");

const S3 = new AWS.S3();

module.exports.handle = async ({ Records: records }, context) => {
  try {
    await Promise.all(
      records.map(async (record) => {
        const { key } = records.s3.object;

        const image = await S3.getObject({
          Bucket: process.env.bucket,
          Key: key,
        }).promise();

        const optimized = await sharp(image.Body)
          .resize(1280, 720, { fit: inside }, { withoutEnlargement: true })
          .toFormat("jpeg", { progressive: true }, { quality: 50 })
          .toBuffer();

        await S3.putObject({
          Body: optimized,
          Bucket: process.env.bucket,
          ContentType: "image/jpeg",

          /* Key: image path.
           * Example: uploads/nome-da-imagem.png
           * basename: nome-da-imagem
           * extname: .png
           * 'basename(key, extname(key))': returns just the basename, without its extension name.
           * This way we can add '.jpeg' into the template string below:
           */
          Key: `compressed/${basename(key, extname(key))}.jpeg`,
        }).promise();
      })
    );

    return {
      statusCode: 301,
      body: {},
    };
  } catch (error) {
    return error;
  }
};
