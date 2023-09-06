import logger from "./logger";

/**
 * @description Find whether record exist by attributes
 * @param {*} Model sequalize model
 * @param {*} attributes where statement
 * @param errorMessage
 */
const checkRecordExistByAttribute = async (Model, attributes, errorMessage) => {
  // check whether product with it exist
  logger.log(
    "debug",
    "Utilities: queryHelper checkRecordExistByAttribute",
    Model
  );

  const existingRecord = await Model.findOne({
    where: { ...attributes }
  });

  if (!existingRecord) {
    const Err = new Error(errorMessage);
    Err.code = 404;

    logger.log(
      "error",
      `Utilities: queryHelper checkRecordExistByAttribute \n ${Err.message}`
    );
    throw Err;
  }

  return true;
};

const checkRecordNotExistByAttributeForUpdate = async (
  Model,
  id,
  attributes,
  errorMessage
) => {
  logger.log(
    "debug",
    "Utilities: queryHelper checkRecordNotExistByAttributeForUpdate",
    Model
  );

  // check whether product with it exist
  const existingRecord = await Model.findOne({
    where: { ...attributes }
  });

  if (existingRecord && existingRecord.id !== id) {
    const Err = new Error(errorMessage);
    Err.code = 406;

    logger.log(
      "error",
      `Utilities: queryHelper checkRecordNotExistByAttributeForUpdate \n ${Err.message}`
    );
    throw Err;
  }

  return true;
};

const checkRecordNotExistByAttribute = async (
  Model,
  attributes,
  errorMessage
) => {
  logger.log(
    "debug",
    "Utilities: queryHelper checkRecordNotExistByAttribute",
    Model
  );

  // check whether product with it exist
  const existingRecord = await Model.findOne({
    where: { ...attributes }
  });

  if (existingRecord) {
    const Err = new Error(errorMessage);
    Err.code = 406;

    logger.log(
      "error",
      `Utilities: queryHelper checkRecordNotExistByAttribute \n ${Err.message}`
    );
    throw Err;
  }

  return true;
};

const checkRecordExistByAttributeForUpload = async (
  Model,
  attributes,
  errorMessage
) => {
  logger.log(
    "debug",
    "Utilities: queryHelper checkRecordExistByAttributeForUpload",
    Model
  );

  // check whether product with it exist
  const existingRecord = await Model.findOne({
    where: { ...attributes }
  });

  return existingRecord;
};

export {
  checkRecordExistByAttribute,
  checkRecordNotExistByAttribute,
  checkRecordNotExistByAttributeForUpdate,
  checkRecordExistByAttributeForUpload
};
