const Models = require("../Models");

const getAnalytics = async (model) => {
  return await Models[model].aggregate([
    { $match: { status: "enrolled" } },
    {
      $group: {
        _id: "$campus",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "campus",
        localField: "_id",
        foreignField: "_id",
        as: "campus",
      },
    },
    {
      $unwind: {
        path: "$campus",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "cities",
        localField: "campus.city",
        foreignField: "_id",
        as: "city",
      },
    },
    { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        campus_id: "$campus._id",
        campus_name: "$campus.en.campus_name",
        city_name: "$city.en.city_name",
        count: 1,
      },
    },
  ]);
};

const getCourseAnalytics = async (model) => {
  return await Models[model].aggregate([
    { $match: { status: "enrolled" } },
    {
      $group: {
        _id: "$course",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "course",
      },
    },
    { $unwind: "$course" },
    {
      $project: {
        _id: 0,
        course_id: "$course._id",
        course_name: "$course.en.course_name",
        count: 1,
      },
    },
  ]);
};

const findOne = async (modelDb, queryObj, options = {}) =>
  await Models[modelDb]?.findOne(queryObj).sort(options).exec();

const searchDocuments = async (modelDb, queryObj) =>
  await Models[modelDb].find(queryObj).exec();

const searchSortLimitDocuments = async (modelDb, queryObj, options = {}) => {
  return await Models[modelDb]
    .find(queryObj)
    .sort(options.sort || {}) // Apply sorting if provided
    .skip(options.skip || 0) // Apply skip if provided
    .limit(options.limit || 0) // Apply limit if provided
    .exec();
};

const updateDocument = async (modelDb, updateQuery, setQuery) => {
  return Models[modelDb].updateOne(updateQuery, { $set: setQuery });
};

const updateWithOperators = async (modelDb, filterQuery, updateQuery) => {
  return Models[modelDb].updateOne(filterQuery, updateQuery);
};

const updateManyDocuments = async (modelDb, updateQuery, setQuery) => {
  return Models[modelDb].updateMany(updateQuery, { $set: setQuery });
};

const updateManyWithOperators = async (modelDb, filterQuery, updateQuery) => {
  return Models[modelDb].updateMany(filterQuery, updateQuery);
};

const insertNewDocument = async (modelDb, storeObj) => {
  let data = new Models[modelDb](storeObj);
  return await data.save();
};
const deleteManyDocuments = async (modelDb, deleteQuery) =>
  await Models[modelDb].deleteMany(deleteQuery);

const getPopulatedData = async (
  modelDb,
  searchQuery,
  populateQuery,
  selectQuery,
  page = 1,
  limit = 100000,
  sort = {}
) => {
  const skip = (page - 1) * limit;
  return await Models[modelDb]
    .find(searchQuery)
    .populate({ path: populateQuery, select: selectQuery })
    .sort(sort)
    .skip(Number(skip))
    .limit(Number(limit));
};

const getPopulatedMultipleKeys = async (
  modelDb,
  searchQuery,
  populateKeys = [], // Array of keys to populate
  selectFields = "", // Fields to select
  page = 1,
  limit = 100000,
  sort = {}
) => {
  const skip = (page - 1) * limit;
  return await Models[modelDb]
    .find(searchQuery)
    .populate(populateKeys.map((key) => ({ path: key, select: selectFields })))
    .sort(sort)
    .skip(Number(skip))
    .limit(Number(limit));
};

const searchPopulatedData = async (
  modelDb,
  searchQuery,
  populateQuery,
  select,
  page = 1,
  limit = 100000,
  sort = { createdAt: -1 } // Default sort by createdAt descending
) => {
  const skip = (page - 1) * limit;
  return await Models[modelDb]
    .find(searchQuery, select)
    .populate(populateQuery)
    .sort(sort)
    .skip(Number(skip))
    .limit(Number(limit));
};

const getPopulated = async (modelDb, prevDocRef, populateQuery) =>
  await Models[modelDb].populate(prevDocRef, populateQuery);

const getAggregate = async (modelDb, aggregateQuery) =>
  await Models[modelDb].aggregate(aggregateQuery);

const deleteDocument = async (modelDb, deleteQuery) =>
  await Models[modelDb].deleteOne(deleteQuery);

const pushIfNotExists = async (modelDb, searchQuery, pushQuery) =>
  await Models[modelDb].update(searchQuery, { $addToSet: pushQuery });

const getDocumentCount = async (modelDb, query) =>
  await Models[modelDb].find(query).count();

const sendAttendanceResponse = (success, message, data = {}) => {
  return {
    attendance_marked: success,
    message,
    ...data,
  };
};

const insertManyDocuments = async (modelDb, docsArray) => {
  return await Models[modelDb].insertMany(docsArray);
};

// TTL calculation function (expires at 9 AM the next day)
const calculateTTL = () => {
  const now = new Date();
  const nextUpdate = new Date(now);
  nextUpdate.setHours(9, 0, 0, 0);
  if (now > nextUpdate) {
    nextUpdate.setDate(nextUpdate.getDate() + 1);
  }
  const ttl = (nextUpdate - now) / 1000;
  return ttl;
};

const getRandomDocument = async (modelDb, queryObj) => {
  const count = await Models[modelDb].countDocuments(queryObj);
  if (count === 0) return null;

  const random = Math.floor(Math.random() * count);
  const doc = await Models[modelDb]
    .findOne(queryObj)
    .select("-answer")
    .skip(random)
    .lean()
    .exec();

  if (doc?.options && Array.isArray(doc.options)) {
    for (let i = doc.options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doc.options[i], doc.options[j]] = [doc.options[j], doc.options[i]];
    }
  }

  return doc;
};
const generateCustomId = (index) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters[index % letters.length];
};
const getTodayDateRange = () => {
  const now = new Date();
  return {
    start: new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      )
    ),
    end: new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        23,
        59,
        59,
        999
      )
    ),
  };
};

module.exports = {
  calculateTTL,
  insertManyDocuments,
  searchSortLimitDocuments,
  sendAttendanceResponse,
  getPopulated,
  searchDocuments,
  updateDocument,
  updateWithOperators,
  deleteManyDocuments,
  insertNewDocument,
  deleteDocument,
  getPopulatedData,
  getAggregate,
  findOne,
  pushIfNotExists,
  getAnalytics,
  getCourseAnalytics,
  getDocumentCount,
  searchPopulatedData,
  updateManyDocuments,
  updateManyWithOperators,
  getPopulatedMultipleKeys,
  getRandomDocument,
  generateCustomId,
  getTodayDateRange,
};
