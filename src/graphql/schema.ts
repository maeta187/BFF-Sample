import { builder } from './builder.js';
import './modules/user.js';

export const schema = builder.toSchema();
