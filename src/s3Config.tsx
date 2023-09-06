import AWS from "aws-sdk"

export const s3Config = {
  bucketName: `${process.env.VITE_S3BUCKET_NAME}`,
  region: `${process.env.VITE_S3BUCKET_REGION}`,
  accessKeyId: `${process.env.VITE_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.VITE_SECRET_ACCESS_KEY}`,
  url: `${process.env.VITE_S3BUCKET_URL}`,
};

const S3_BUCKET = s3Config.bucketName;
const REGION = s3Config.region;

AWS.config.update({
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
});

export const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const s3URL = `https://s3.amazonaws.com/${S3_BUCKET}`;
