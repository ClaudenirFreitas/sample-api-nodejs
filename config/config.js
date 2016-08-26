export default {
  database: 'books',
  username: null,
  password: null,
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV}_books.sqlite`,
    define: {
      underscored: true,
    },
  },
};
