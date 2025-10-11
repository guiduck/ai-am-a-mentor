# Infrastructure Documentation (Current State)

This document outlines the AWS infrastructure provisioned using Pulumi for the video learning platform, specifically focusing on the video transcription component.

## Deployed Resources:

- **S3 Bucket for Video Uploads:**

  - Name: `videouploadbucket-1f616b5` (or similar, check Pulumi outputs for exact name)
  - Purpose: Stores raw video files uploaded by creators.
  - Configuration: Configured to trigger a Lambda function (`videoTranscriptionLambda`) when new objects are created in the `videos/` prefix.

- **IAM Role for Lambda Function:**

  - Name: `lambdaRole` (or similar)
  - Purpose: Provides necessary permissions for the Lambda function to execute, access S3, and interact with AWS Transcribe.
  - Attached Policies:
    - `AWSLambdaBasicExecutionRole`
    - `AmazonS3FullAccess` (for simplicity during development; consider more granular permissions for production)
    - `AmazonTranscribeFullAccess`

- **Lambda Function for Video Transcription:**

  - Name: `videoTranscriptionLambda-52a150f` (or similar, check Pulumi outputs for exact name)
  - Runtime: Node.js 18.x
  - Handler: `index.handler` (code located in `./lambda/index.js`)
  - Purpose: Initiates an AWS Transcribe job when a new video is uploaded to the S3 bucket.
  - Environment Variables: `BUCKET_NAME` (set to the S3 video upload bucket ID)

- **S3 Bucket Notification:**

  - Configures the `videoUploadBucket` to invoke `videoTranscriptionLambda` upon `s3:ObjectCreated:*` events, specifically for objects with the `videos/` prefix.
  - Explicitly depends on `s3LambdaPermission` to ensure correct permission setup before notification configuration.

- **Lambda Permission:**
  - Grants the S3 service permission to invoke the `videoTranscriptionLambda` function.

## Deployed Resources (continued):

- **PostgreSQL RDS Instance:**
  - Identifier: `videolearn-db-instance`
  - Endpoint: `videolearn-db-instance.c54yk6ioagg4.sa-east-1.rds.amazonaws.com` (or similar, check Pulumi outputs for exact endpoint)
  - Database Name: `videolearndb`
  - Username: `dbadmin`
  - Engine Version: `14.17`
  - Instance Class: `db.t3.micro`
  - Allocated Storage: `20 GB`
  - Purpose: Relational database for storing application data, including video metadata and processed transcripts.
magic ui
## Next Steps (as of today):

The immediate next task is to design the database schema.

1.  Storing Transcripts: Once AWS Transcribe processes a video, the transcript will be saved to your S3 bucket (in the transcripts/ folder as
    per your Lambda code). We'll need to get these transcripts into a database for efficient querying.

2.  Database Setup: We'll need to provision a PostgreSQL database (as per your project plan) and design a schema to store the video metadata
    and transcripts.

3.  Transcript Processing & Indexing: A mechanism to read the transcripts from S3, process them (e.g., chunking, embedding), and store them in
    the database. This might involve another Lambda function or a dedicated service.
4.  AI Assistant (RAG Model): Building the actual RAG component that takes a student's question, retrieves relevant transcript segments from
    the database, and uses an LLM to generate an answer.

**postgresql database endpoint** videolearn-db-instance.c54yk6ioagg4.sa-east-1.rds.amazonaws.com
