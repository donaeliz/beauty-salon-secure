// MySQL connection disabled - using SQLite instead
module.exports = {
  executeQuery: function(query) {
    return Promise.resolve([]);
  },
  executeQueryWithParam: function(query, params) {
    return Promise.resolve([]);
  }
};
