<template>
  <div>
    <div class="container">
      <div class="main_wrapper">
        <div class="content_container">
          <div class="title_container">
            <h1>MAIN PAGE</h1>
          </div>
          <div class="content">
            <div class="user_list_container">
              <div class="user_list_title">
                <h2>User List</h2>
              </div>
              <div class="user_list_wrapper">
                <user-list />
              </div>
              <div class="button_container">
                <button @click="onCreateUserClick">Create User</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import UserList from "@/components/UserList";
export default {
  name: "HomePage",

  components: {
    UserList,
  },

  computed: {
    // ...mapGetters("users", ["users"]),
  },

  methods: {
    // ...mapActions("users", ["loadUsers"]),
    onCreateUserClick() {
      this.$router.push({ name: "createUserPage" });
    },
  },

  // mounted() {
  //   this.loadUsers();
  // },
};
</script>

<style lang="scss" scoped></style>
