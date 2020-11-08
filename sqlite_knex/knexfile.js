// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/database.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foriegn_keys = ON", done)
      }
    }
  }
};
