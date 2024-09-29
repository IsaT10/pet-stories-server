import QueryBuilder from '../../builder/QueryBuilder';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'email'];

  const userQuery = new QueryBuilder(User.find(), query)
    .search(searchableFields)
    .fields()
    .pagination()
    .sort()
    .filter();

  const result = await userQuery.queryModel;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export {
  createUserIntoDB,
  getAllUsersFromDB,
  updateUserIntoDB,
  getSingleUserFromDB,
};
