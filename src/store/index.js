import { createStore } from "vuex";

import users from "./users";
import events from "./events";

const store = createStore({
  modules: {
    users,
    events,
  },
});

export default store;
