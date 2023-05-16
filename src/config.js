import dotenv from "dotenv";

//.ENV MUST BE OUTSIDE of src directory
dotenv.config();

export default{
  port: process.env.PORT,
  uri_mongodb: process.env.URI_MONGODB,
  secret_key_jwt: process.env.SECRET_KEY_JWT,
  default_password: process.env.DEFAULT_PASSWORD,
  persistence: process.env.PERSISTENCE,
  github_register_client_id: process.env.GITHUB_REGISTER_CLIENT_ID,
  github_register_client_secret: process.env.GITHUB_REGISTER_CLIENT_SECRET,
  github_login_client_id: process.env.GITHUB_LOGIN_CLIENT_ID,
  github_login_client_secret: process.env.GITHUB_LOGIN_CLIENT_SECRET,
  google_register_client_id: process.env.GOOGLE_REGISTER_CLIENT_ID,
  google_register_client_secret: process.env.GOOGLE_REGISTER_CLIENT_SECRET,
  google_login_client_id: process.env.GOOGLE_LOGIN_CLIENT_ID,
  google_login_client_secret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  node_env: process.env.NODE_ENV
};
