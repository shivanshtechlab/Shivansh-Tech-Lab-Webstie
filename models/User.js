import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const User = sequelize.define(
  'User',
  {
    id:     { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:   { type: DataTypes.STRING(100), allowNull: false, validate: { len: [2, 100] } },
    email:  { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
    phone:  { type: DataTypes.STRING(25),  allowNull: true,  defaultValue: null },
    role:   {
      type: DataTypes.ENUM('admin', 'manager', 'developer', 'designer', 'client'),
      allowNull: false, defaultValue: 'client',
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false, defaultValue: 'active',
    },
    avatar: { type: DataTypes.STRING(5), allowNull: true },
  },
  { tableName: 'users', timestamps: true }
);

let _synced = false;
export async function syncModel() {
  if (!_synced) {
    await sequelize.authenticate();
    await User.sync({ alter: true });
    _synced = true;
  }
}

export default User;
