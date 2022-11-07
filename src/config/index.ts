export interface Config {
  port: number;
  database: {
    uri: string;
  };
  secrets: {
    access: string;
    refresh: string;
  };
  s3: {
    secretAccessKey: string;
    accessKeyID: string;
    bucketName: string;
    region: string;
  };
}

export const config = () => ({
  port: parseInt(process.env.PORT) || 5000,
  database: {
    uri: process.env.DATABASE_URI,
  },
  secrets: {
    access: process.env.ACCESS_SECRET,
    refresh: process.env.REFRESH_SECRET,
  },
  s3: {
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    accessKeyID: process.env.S3_ACCESS_KEY_ID,
    bucketName: process.env.S3_BUCKET_NAME,
    region: process.env.S3_REGION,
  },
});
