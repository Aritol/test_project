<template>
  <tr>
    <td>{{ user.name }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phoneNumber }}</td>
    <td>{{ userEventsCounter }}</td>
    <td v-if="userEvents">{{ userEvents[0].startDate }}</td>
    <td v-if="!userEvents">No events</td>
  </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserListItem",

  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      userEventsCounter: 0,
      userEvents: null,
    };
  },

  computed: {
    ...mapGetters("events", ["events"]),
  },

  methods: {
    ...mapActions("events", ["loadEvents", "loadAllEvents"]),
  },

  async mounted() {
    this.userEventsCounter = await this.loadAllEvents();

    const eventForCurrentUser = this.userEventsCounter.filter(
      (element) => element.userId == this.user._id
    );

    this.userEventsCounter = eventForCurrentUser.length;
    if (eventForCurrentUser.length) {
      this.userEvents = await eventForCurrentUser;
    }
  },
};
</script>

<style lang="scss" scoped></style>
