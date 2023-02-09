import path from 'path';
import {fileURLToPath} from 'url';
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
    }
}