<template>
  <div>
    <div class="container">
      <div class="main_wrapper">
        <div class="title_container">
          <h1>Create User Page</h1>
        </div>
        <div class="button_back_container">
          <button @click="onBackClick">Back</button>
        </div>
        <div class="content_container">
          <div class="form_container">
            <form @submit.prevent="submit">
              <div class="name_input_container">
                <input
                  type="text"
                  placeholder="User name"
                  v-model="userData.name"
                />
              </div>
              <div class="surname_input_container">
                <input
                  type="text"
                  placeholder="User surname"
                  v-model="userData.lastName"
                />
              </div>
              <div class="email_input_container">
                <input
                  type="text"
                  placeholder="Email"
                  v-model="userData.email"
                />
              </div>
              <div class="phone_input_container">
                <input
                  type="text"
                  placeholder="Phone number"
                  v-model="userData.phoneNumber"
                />
              </div>
              <!-- <div class="event_date_input_container">
                <input type="date" v-model="userData.eventDate" />
              </div> -->
              <div class="buttons_container">
                <button @click="onCreateUser">Create User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreateUserPage",

  data() {
    return {
      userData: {},
    };
  },

  methods: {
    ...mapActions("users", ["addUser"]),
    onBackClick() {
      this.$router.push({ name: "homePage" });
    },

    async onCreateUser() {
      console.log(this.userData);
      await this.addUser(this.userData);
      this.$router.push({ name: "homePage" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
