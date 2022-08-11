export default {
  users: {
    readList: `${process.env.VUE_APP_API_URL}/users`,
    add: `${process.env.VUE_APP_API_URL}/users`,
    update: `${process.env.VUE_APP_API_URL}/users`,
    getUserById: (id) => `${process.env.VUE_APP_API_URL}/users/${id}`,
    delete: `${process.env.VUE_APP_API_URL}/users`,
  },

  events: {
    readAllList: `${process.env.VUE_APP_API_URL}/events`,
    readList: (userId) => `${process.env.VUE_APP_API_URL}/events/${userId}`,
    add: `${process.env.VUE_APP_API_URL}/events`,
    update: `${process.env.VUE_APP_API_URL}/events`,
    getEventById: (id) => `${process.env.VUE_APP_API_URL}/events/${id}`,
    delete: `${process.env.VUE_APP_API_URL}/events`,
  },
};
