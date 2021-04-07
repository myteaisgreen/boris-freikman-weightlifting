module.exports = {
    LocalDbUri: `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    OnlineDbUri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dk6sq.mongodb.net/${process.env.ONLINE_DB_NAME}?retryWrites=true&w=majority`,
  };