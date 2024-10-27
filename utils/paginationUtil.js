export const paginate = async (model, page, limit, query) => {
  const skip = (page - 1) * limit;
  return await model.find(query).skip(skip).limit(limit);
};
