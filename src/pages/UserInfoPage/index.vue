<template>
  <div>
    <div class="container">
      <div class="main_wrapper">
        <div class="page_title">
          <h1>User info page</h1>
        </div>
        <div class="button_back_container">
          <button @click="onBackClick">Back</button>
        </div>
        <div class="content_container">
          <div class="user_information_container">
            <div class="name_container">
              <p>Name:</p>
              <p>{{ userData.name }}</p>
            </div>
            <div class="last_name_container">
              <p>lastName:</p>
              <p>{{ userData.lastName }}</p>
            </div>
            <div class="email_container">
              <p>email:</p>
              <p>{{ userData.email }}</p>
            </div>
            <div class="phone_number_container">
              <p>phoneNumber:</p>
              <p>{{ userData.phoneNumber }}</p>
            </div>
          </div>
          <div class="button_create_event_container">
            <button @click="onCreateEvent">Create Event</button>
          </div>
          <div class="events_container">
            <h1>Events</h1>

            <div class="events_table_container" v-if="events.length">
              <table class="events_table" border="2px">
                <tbody>
                  <th>Title</th>
                  <th>description</th>
                  <th>start date</th>
                  <th>end date</th>
                  <tr v-for="event in events" :key="event._id">
                    <td>{{ event.title }}</td>
                    <td>{{ event.description }}</td>
                    <td>{{ event.startDate }}</td>
                    <td>{{ event.endDate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="events_empty_container" v-if="events.length == 0">
              No events for this user
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserInfoPage",

  data() {
    return {
      userData: Object,
    };
  },

  computed: {
    ...mapGetters("events", ["events"]),
  },

  methods: {
    ...mapActions("users", ["getUserById"]),
    ...mapActions("events", ["loadEvents"]),

    onBackClick() {
      this.$router.push({ name: "homePage" });
    },

    onCreateEvent() {
      this.$router.push({
        name: "createEventPage",
        params: { userId: this.$route.params.id },
      });
    },
  },

  async mounted() {
    this.userData = await this.getUserById(this.$route.params.id);
    await this.loadEvents(this.$route.params.id);
    // console.log("eventsData----------------");
    // console.log(this.events);
  },
};
</script>

<style lang="scss" scoped>
.user_information_container {
  div {
    justify-content: center;
    display: flex;
    p {
      margin-left: 10px;
    }
  }
}
</style>
