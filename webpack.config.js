const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // check file exist
const path = require('path'); // get current path

module.exports = (env) => {
  // get root path
  const currentPath = path.join(__dirname);


  // fallback path
  const basePath = currentPath + '/.env';

  // concat environment name to filename to specify the correct env file!
  const envPath = basePath + '.' + env.ENVIRONMENT;

  // check if file exist, otherwise fallback to the .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // set parameter in dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed

  // object from env variable
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  // webpack config
  return {
    plugins: [
      // add plugin
      new webpack.DefinePlugin(envKeys)
    ]
  };
};