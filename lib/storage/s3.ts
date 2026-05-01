import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

const BUCKET = process.env.S3_BUCKET!;
const PREFIX = 'kb/';

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: process.env.AWS_REGION ?? 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

function s3Key(relPath: string): string {
  return PREFIX + relPath;
}

export async function saveToS3(relPath: string, content: string): Promise<void> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key(relPath),
      Body: content,
      ContentType: 'text/markdown; charset=utf-8',
    }),
  );
}

export async function loadFromS3(relPath: string): Promise<string | null> {
  try {
    const res = await getClient().send(
      new GetObjectCommand({ Bucket: BUCKET, Key: s3Key(relPath) }),
    );
    return await res.Body!.transformToString('utf-8');
  } catch (err: unknown) {
    const code = (err as { name?: string })?.name;
    if (code === 'NoSuchKey' || code === 'NotFound') return null;
    throw err;
  }
}

export async function existsInS3(relPath: string): Promise<boolean> {
  try {
    await getClient().send(
      new HeadObjectCommand({ Bucket: BUCKET, Key: s3Key(relPath) }),
    );
    return true;
  } catch {
    return false;
  }
}
