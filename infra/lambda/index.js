const AWS = require('aws-sdk');
const transcribe = new AWS.Transcribe();

exports.handler = async (event) => {
    console.log('Received S3 event:', JSON.stringify(event, null, 2));

    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    const mediaFormat = key.split('.').pop();
    const transcriptionJobName = `transcription-${Date.now()}`;

    const params = {
        TranscriptionJobName: transcriptionJobName,
        LanguageCode: 'en-US', // You can make this configurable
        MediaFormat: mediaFormat, // e.g., 'mp4', 'wav', 'flac'
        Media: {
            MediaFileUri: `s3://${bucket}/${key}`,
        },
        OutputBucketName: bucket, // Store transcripts in the same bucket for now
        OutputKey: `transcripts/${transcriptionJobName}.json`, // Store in a 'transcripts' folder
    };

    try {
        await transcribe.startTranscriptionJob(params).promise();
        console.log(`Transcription job started: ${transcriptionJobName}`);
        return { statusCode: 200, body: 'Transcription job started successfully' };
    } catch (error) {
        console.error('Error starting transcription job:', error);
        return { statusCode: 500, body: 'Error starting transcription job' };
    }
};
