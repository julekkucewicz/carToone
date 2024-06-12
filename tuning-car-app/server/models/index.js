const { Sequelize, DataTypes } = require('sequelize');

// Konfiguracja bazy danych
const sequelize = new Sequelize('CarTuning', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

const Posts = sequelize.define('Posts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false
});

const Comments = sequelize.define('Comments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Posts,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false
});

// Definiowanie asocjacji
Users.hasMany(Posts, { foreignKey: 'user_id', as: 'posts' });
Posts.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Posts.hasMany(Comments, { foreignKey: 'post_id', as: 'comments' });
Comments.belongsTo(Posts, { foreignKey: 'post_id', as: 'post' });

Users.hasMany(Comments, { foreignKey: 'user_id', as: 'user_comments' });
Comments.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  Users,
  Posts,
  Comments
};
