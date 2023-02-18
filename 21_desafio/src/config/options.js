import { config } from './config.js';



export const options = {
    mariaDb:{
        client:'mysql',
        connection:{
            host: config.MARIADB_HOST,
            user: 'root',
            password:'',
            database:'ecommerce'
        }
    },
    firebase:{
        "type": config.FIREBASE_TYPE,
        "project_id": config.FIREBASE_PROJECT_ID,
        "private_key_id": config.FIREBASE_KEY_ID,
        "private_key":config.FIREBASE_PRIVATE_KEY ,
        "client_email": config.FIREBASE_CLIENT_EMAIL,
        "client_id":config.FIREBASE_CLIENT_ID ,
        "auth_uri": config.FIREBASE_AUTH_URI,
        "token_uri": config.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url":config.FIREBASE_AUTH_PROVIDER_X509_CERT_URI ,
        "client_x509_cert_url": config.FIREBASE_CLIENT_X509_CERT_URI
    }
}
