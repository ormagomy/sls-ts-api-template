import { model, NULL, Schema } from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { v4 as uuid } from 'uuid';

export class PlayerType extends Document {
  id!: string;
  teamName!: string;
  name!: string;
  description?: string;
  tags!: [{ name: string }];
}

const PlayerSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
      default: uuid,
    },
    teamName: {
      type: String,
      index: {
        global: true,
        name: 'teamNameIndex',
        rangeKey: 'createdAt',
      }, // creates a global secondary index with the name `teamNameIndex` and hashKey `teamName`
    },
    name: String,
    description: [String, NULL],
    tags: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            name: String,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    // saveUnknown: true,
  }
);

export const playerDbFactory = ({ tableName }: { tableName: string }) => {
  return model<PlayerType>(tableName, PlayerSchema);
};
