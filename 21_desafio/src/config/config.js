import * as dotenv from "dotenv";

dotenv.config()

//creamos la configuracion de nuestra aplicacion
export const config = {
    MARIADB_HOST: process.env.MARIADB_HOST,
    SQLITE_DB: process.env.SQLITE_DB,
    FILE_DB: process.env.FILE_DB,
    MONGO_AUTENTICATION:process.env.MONGO_AUTENTICATION,
    MONGO_DB:process.env.MONGO_DB,
    MONGO_SESSION:process.env.MONGO_SESSION,
    TEST_EMAIL: process.env.TEST_EMAIL,
    TEST_PASSWORD : process.env.TEST_PASSWORD,
    ACCOUNT_ID_TWILIO : process.env.ACCOUNT_ID_TWILIO,
    AUTH_TWILIO : process.env.AUTH_TWILIO ,
    SMS_TWILIO : process.env.SMS_TWILIO,
    WSP_TWILIO : process.env.WSP_TWILIO,
    WSP_ADMIN : process.env.WSP_ADMIN,
    FIREBASE_PROJECT_ID: process.env. FIREBASE_PROJECT_ID,
    FIREBASE_KEY_ID : process.env.FIREBASE_KEY_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL  : process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_CLIENT_ID  : process.env.FIREBASE_CLIENT_ID,
    FIREBASE_AUTH_URI : process.env. FIREBASE_AUTH_URI,
    FIREBASE_TOKEN_URI : process.env.FIREBASE_TOKEN_URI,
    FIREBASE_AUTH_PROVIDER_X509_CERT_URI : process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URI,
    FIREBASE_CLIENT_X509_CERT_URI : process.env.FIREBASE_CLIENT_X509_CERT_URI,
    FIREBASE_TYPE: process.env.FIREBASE_TYPE,
};
