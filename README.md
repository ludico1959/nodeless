# NODELESS 📷📡💭💾
Nodeless is a application that manipulates and optimizse images that have been uploaded to Amazon S3 using AWS Lambda. 
This is my first serverless application and it was build as a practice project while I was attending the AWS Lambda Foundations course from AWS Skill Builder.
As its name implies, this app was build using Node.JS, Serverless Framework (all-in-one development & monitoring of auto-scaling apps on AWS Lambda) and sharp third party module for converting large images in common formats to smaller and web-friendly ones.
A whole lecture about this program can be found in [this YouTube video](https://www.youtube.com/watch?v=jiP45rEOEbA) from the channel Rocketseat.

## 💾 Resources

- [Node.JS](https://nodejs.org/en/);
- [Serverless](https://www.serverless.com/);
- [AWS SDK](https://github.com/aws/aws-sdk-js);
- [Sharp](https://www.npmjs.com/package/sharp);
- AWS Services:
  - Lambda
  - S3
  - CloudWatch
  - IAM 

## 💭 Deployment steps

### 1️⃣ Init the project
```
  npm init
```
```
  yarn init
```

### 2️⃣ Install serverless framework 
Install its third party module.
```
  npm i -D serverless
```
```
  yarn add -D serverless
```
### 3️⃣ Create the service
Create the service with the template aws-nodejs
```
./node_modules/.bin/serverless create --template aws-nodejs
```
This will create two main files in the working directory:
- **serverless.yml**: each service configuration is managed in the serverless.yml file.
- **handler.js**: contains your function code. The function definition in serverless.yml will point to this handler.js file and the function exported here.

### 3️⃣ Config credentials
Acess AWS Console, select IAM service and choose Users option. Add a new User selecting "Access type" = **Programmatic access** to enable an access key ID and secret access key, and "Permissions" = **Directly attach existing policies and AdministratorAccess**.

Now, back to command line interpreter, type this to config the credentials replacing the placeholder:
```
./node_modules/.bin/serverless config credentials -o --provider aws --key=<ACESS_KEY_ID> --secret <SECRET_ACESS_KEY>
```

### 4️⃣ Edit files in working directory
Edit **serverless.yml** and **handler.js** files. 

### 5️⃣ Deploy
```
./node_modules/.bin/serverless deploy --verbose
```
The **verbose** flag show everything that is happening during the deploy process on the console.

### 6️⃣ Remove deployed function
Delete everything related to this serverless function inside the AWS S3.
```
./node_modules/.bin/serverless remove
```

