import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as aws_native from "@pulumi/aws-native";

// Create an S3 bucket for video uploads
const videoUploadBucket = new aws.s3.Bucket("videoUploadBucket", {
  forceDestroy: true, // For easy cleanup during development
});

// Export the name of the bucket
export const bucketName = videoUploadBucket.id;

// Create an IAM role for the Lambda function
const lambdaRole = new aws.iam.Role("lambdaRole", {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: "lambda.amazonaws.com",
  }),
});

// Attach the AWSLambdaBasicExecutionRole policy to the Lambda role
new aws.iam.RolePolicyAttachment("lambdaBasicExecution", {
  role: lambdaRole.name,
  policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
});

// Attach a policy to allow the Lambda function to access S3
new aws.iam.RolePolicyAttachment("lambdaS3Access", {
  role: lambdaRole.name,
  policyArn: aws.iam.ManagedPolicy.AmazonS3FullAccess,
});

// Attach a policy to allow the Lambda function to use AWS Transcribe
new aws.iam.RolePolicyAttachment("lambdaTranscribeAccess", {
  role: lambdaRole.name,
  policyArn: aws.iam.ManagedPolicy.AmazonTranscribeFullAccess,
});

// Create a Lambda function that will be triggered by S3 object creation
const videoTranscriptionLambda = new aws.lambda.Function(
  "videoTranscriptionLambda",
  {
    code: new pulumi.asset.AssetArchive({
      ".": new pulumi.asset.FileArchive("./lambda"), // Code will be in a 'lambda' directory
    }),
    runtime: aws.lambda.Runtime.NodeJS18dX,
    role: lambdaRole.arn,
    handler: "index.handler",
    environment: {
      variables: {
        BUCKET_NAME: videoUploadBucket.id,
      },
    },
  }
);

// Grant the S3 bucket permission to invoke the Lambda function
const s3LambdaPermission = new aws.lambda.Permission("s3LambdaPermission", {
  action: "lambda:InvokeFunction",
  function: videoTranscriptionLambda.name,
  principal: "s3.amazonaws.com",
  sourceArn: videoUploadBucket.arn,
});

// Configure the S3 bucket to trigger the Lambda function on new object creation
new aws.s3.BucketNotification(
  "videoUploadBucketNotification",
  {
    bucket: videoUploadBucket.id,
    lambdaFunctions: [
      {
        lambdaFunctionArn: videoTranscriptionLambda.arn,
        events: ["s3:ObjectCreated:*"],
        filterPrefix: "videos/", // Only trigger for objects in the 'videos/' prefix
      },
    ],
  },
  { dependsOn: [s3LambdaPermission] }
);

// Create a PostgreSQL RDS instance
const dbInstance = new aws.rds.Instance("dbInstance", {
  engine: "postgres",
  engineVersion: "14.17", // Specify a PostgreSQL version
  instanceClass: "db.t3.micro",
  allocatedStorage: 20, // 20 GB storage
  identifier: "videolearn-db-instance",
  dbName: "videolearndb",
  username: "dbadmin",
  password: "Guiduck123",
  // password: "dbpassword", // CHANGE THIS IN PRODUCTION
  skipFinalSnapshot: true, // For easy cleanup during development
  publiclyAccessible: true, // For easy access during development, restrict in production
});

// Export the database endpoint and name
export const dbEndpoint = dbInstance.address;
export const dbName = dbInstance.dbName;

// Export the Lambda function name
export const lambdaFunctionName = videoTranscriptionLambda.name;
