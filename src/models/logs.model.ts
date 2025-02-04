import { dynamodbLocalConnection } from './dynamodb.local';
dynamodbLocalConnection();

import { getEnv } from '../helper/environment';
import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { v7 as uuidv7 } from 'uuid';


export enum EventLogCode {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  GET    = 'GET',
}

export const EventLogCodes: EventLogCode[] = Object.values(EventLogCode);

export type EventLog = {
  id: string;
  eventCode: EventLogCode;
  createdAt: Date;
  updatedAt: Date;
} & Item;

export const EventLogSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: uuidv7,
    },
    eventCode: {
      required: true,
      type: String,
      enum: EventLogCodes,
      rangeKey: true,
      index: {
        type: 'global',
        name: getEnv('LOGS_TABLE_CODE_INDEX'),
      },
    },
  }, {
    timestamps: true,
  },
);

export const LogsModel = dynamoose.model<EventLog>(
  getEnv('LOGS_TABLE'),
  EventLogSchema,
  {
    create: false,
    update: false,
  },
);
