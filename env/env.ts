import dotenv from 'dotenv';
import 'reflect-metadata';
import { cleanEnv } from 'envalid';
import validators from './validators';

dotenv.config(); // read .env files into process.env

const env = cleanEnv(process.env, validators);

export default env;
