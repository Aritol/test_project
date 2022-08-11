// import { createStore } from 'vuex'
import axios from "axios";
import apiEndpoints from "@/constants/apiEndpoints";

const store = {
  namespaced: true,
  state: {
    users: [],

    loading: false, //індикатор завантаження
    error: false, //індикатор помилки
  },
  getters: {
    users: (state) => state.users,

    isLoading: (state) => state.loading,
    isError: (state) => state.error,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    addUserToList(state, user) {
      state.users.push(user);
    },
    deleteUserFromList(state, userId) {
      state.users = state.users.filter((user) => user._id !== userId);
    },

    setLoading(state, data) {
      state.loading = data;
    },
    setError(state, data) {
      state.error = data;
    },
  },
  actions: {
    async loadUsers({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      //Запит на сервер
      await axios
        .get(apiEndpoints.users.readList) //Асинхронна дія
        .then(
          //Якщо добре
          (res) => res.data
        )
        .then((resData) => {
          if (resData.success) commit("setUsers", resData.data);
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

    addUser({ commit }, user) {
      console.log("user---");
      console.log(user);
      commit("setLoading", true);
      commit("setError", null);

      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.users.add, user)
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
    updateUser({ commit }, user) {
      commit("setLoading", true);
      commit("setError", null);

      return new Promise((resolve, reject) => {
        axios
          .put(apiEndpoints.users.update, user)
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

    getUserById({ commit }, id) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.users.getUserById(id))
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
    deleteUser({ commit }, id) {
      commit("setLoading", true);
      commit("setError", null);
      new Promise((resolve, reject) => {
        axios
          .delete(apiEndpoints.users.delete, { data: { id } })
          .then(
            //Якщо добре
            (res) => res.data
          )
          .then((resData) => {
            console.log("-resData");
            console.log(resData);
            if (resData.success) {
              commit("deleteUserFromList", id);
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
