import { ObjectType } from 'dynamoose/dist/General';

/**
 * Validates that the object has the required fields.
 *
 * @throws If any required field is missing
 */
export const validateRequiredFields = (
  obj: ObjectType,
  requiredFields: string[],
  type: string
) => {
  requiredFields.forEach((field) => {
    if (!obj.hasOwnProperty(field) || obj[field] === undefined) {
      throw new Error(`'${type}' missing required field: ${field}`);
    }
  });
};
