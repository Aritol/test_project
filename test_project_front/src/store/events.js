// import { createStore } from 'vuex'
import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints";

const store = {
  namespaced: true,
  state: {
    events: [],

    loading: false, //індикатор завантаження
    error: false, //індикатор помилки
  },
  getters: {
    events: (state) => state.events,

    isLoading: (state) => state.loading,
    isError: (state) => state.error,
  },
  mutations: {
    setEvents(state, events) {
      state.events = events;
    },
    addEventToList(state, event) {
      state.events.push(event);
    },
    deleteEventFromList(state, eventId) {
      state.events = state.events.filter((event) => event._id !== eventId);
    },

    setLoading(state, data) {
      state.loading = data;
    },
    setError(state, data) {
      state.error = data;
    },

    clearState(state) {
      state.events = [];
    },
  },
  actions: {
    loadEvents({ commit }, userId) {
      // commit("clearState");
      commit("setLoading", true);
      commit("setError", null);
      //Запит на сервер
      axios
        .get(apiEndpoints.events.readList(userId)) //Асинхронна дія
        .then(
          //Якщо добре
          (res) => res.data
          // (res) => {
          //   res.data;
          //   console.log("res.data");
          //   console.log(res.data);
          // }
        )
        .then((resData) => {
          if (resData.success) commit("setEvents", resData.data);
          else throw new Error("Fatch failed!");
        })
        .catch((err) => {
          //Якщо погано
          commit("setError", err);
        })
        .finally(
          //Завжди
          () => commit("setLoading", false)
        );
    },

    // loadAllEvents({ commit }) {
    //   // commit("clearState");
    //   commit("setLoading", true);
    //   commit("setError", null);
    //   //Запит на сервер
    //   axios
    //     .get(apiEndpoints.events.readAllList) //Асинхронна дія
    //     .then(
    //       //Якщо добре
    //       (res) => res.data
    //       // (res) => {
    //       //   res.data;
    //       //   console.log("res.data");
    //       //   console.log(res.data);
    //       // }
    //     )
    //     .then((resData) => {
    //       if (resData.success) resolve(resData.data);
    //       else throw new Error("Fatch failed!");
    //     })
    //     .catch((err) => {
    //       //Якщо погано
    //       commit("setError", err);
    //     })
    //     .finally(
    //       //Завжди
    //       () => commit("setLoading", false)
    //     );
    // },

    loadAllEvents({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.events.readAllList)
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            if (resData.success) resolve(resData.data);
            else throw new Error("Fatch failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },

    addEvent({ commit }, event) {
      console.log("user---");
      console.log(event);
      commit("setLoading", true);
      commit("setError", null);

      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.events.add, event)
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fatch failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },
    updateEvent({ commit }, event) {
      commit("setLoading", true);
      commit("setError", null);

      return new Promise((resolve, reject) => {
        axios
          .put(apiEndpoints.events.update, event)
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fatch failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },

    getEventById({ commit }, id) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.events.getEventById(id))
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            if (resData.success) resolve(resData.data);
            else throw new Error("Fatch failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },
    deleteEvent({ commit }, id) {
      commit("setLoading", true);
      commit("setError", null);
      new Promise((resolve, reject) => {
        axios
          .delete(apiEndpoints.events.delete, { data: { id } })
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            console.log("-resData");
            console.log(resData);
            if (resData.success) {
              commit("deleteEventFromList", id);
              resolve(true);
            } else throw new Error("Delete failed!");
          })
          .catch((err) => {
            //Якщо погано
            commit("setError", err);
            reject(err);
          })
          .finally(
            //Завжди
            () => commit("setLoading", false)
          );
      });
    },
  },
};

export default store;
