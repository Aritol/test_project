<template>
  <div>
    <div class="container">
      <div class="main_wrapper">
        <div class="page_title">
          <h1>Create Event</h1>
        </div>
        <div class="button_back_container">
          <button @click="onBackClick">Back</button>
        </div>
        <div class="content_container">
          <form class="event_form" @submit.prevent>
            <div class="event_title_container">
              <label for="">Title</label>
              <input
                type="text"
                placeholder="Title"
                v-model="eventData.title"
                required
              />
            </div>
            <div class="event_description_container">
              <label for="">Description</label>
              <input
                type="text"
                placeholder="Description"
                v-model="eventData.description"
                required
              />
            </div>
            <div class="event_startDate_container">
              <label for="">Event start date</label>
              <input
                type="date"
                placeholder="Start date"
                v-model="eventData.startDate"
                @change="onDatePickerChange"
                required
              />
            </div>
            <div class="event_endDate_container">
              <label for="">Event end date</label>
              <input
                type="date"
                placeholder="End date"
                v-model="eventData.endDate"
                @change="onDatePickerChange"
                required
              />
            </div>
            <div class="buttons_container">
              <button @click="onAddEvent">Add Event</button>
            </div>
          </form>

          <div class="date_isBusy_container" v-if="dateAlreadyTaken">
            <h2>You can’t create event for this time</h2>
          </div>
          <div class="invalid_date_container" v-if="datesError">
            <h2>Invalid date</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CreateEventPage",

  data() {
    return {
      eventData: {
        userId: this.$route.params.userId,
      },
      eventsEndDates: [],

      dateAlreadyTaken: null,
      datesError: null,
    };
  },

  computed: {
    ...mapGetters("events", ["events"]),
  },

  methods: {
    ...mapActions("events", ["addEvent", "loadEvents"]),
    ...mapActions("users", ["getUserById"]),

    onBackClick() {
      this.$router.push({
        name: "userInfoPage",
        params: { id: this.$route.params.userId },
      });
    },

    onDatePickerChange() {
      this.dateAlreadyTaken = false;
      this.datesError = false;
    },
    async onAddEvent() {
      // if (
      //   this.eventData.title &&
      //   this.eventData.description &&
      //   this.eventData.startDate &&
      //   this.eventData.endDate
      // ) {
      //   this.events.forEach((element) => {
      //     if (
      //       this.eventData.startDate <= element.startDate &&
      //       this.eventData.endDate >= element.endDate
      //     ) {
      //       console.log("diapazon work");
      //       this.dateAlreadyTaken = true;
      //       return element;
      //     } else {
      //       if (
      //         (this.eventData.startDate >= element.startDate &&
      //           this.eventData.startDate <= element.endDate) ||
      //         (this.eventData.startDate <= element.endDate &&
      //           this.eventData.startDate >= element.startDate) ||
      //         (this.eventData.endDate >= element.startDate &&
      //           this.eventData.endDate <= element.endDate)
      //       ) {
      //         console.log("we cant reg");
      //         // this.dateAlreadyTaken = true;
      //         // return element;
      //       } else {
      //         console.log("reged succes");
      //         // await this.addEvent(this.eventData);
      //         // this.$router.push({
      //         //   name: "userInfoPage",
      //         //   params: { id: this.$route.params.userId },
      //         // });
      //       }
      //     }
      //   });
      // }

      if (
        this.eventData.title &&
        this.eventData.description &&
        this.eventData.startDate &&
        this.eventData.endDate
      ) {
        if (this.eventData.startDate > this.eventData.endDate) {
          this.datesError = true;
        } else {
          let dateIsBusy = false;

          for (let i = 0; i < this.events.length; i++) {
            if (
              this.eventData.startDate <= this.events[i].startDate &&
              this.eventData.endDate >= this.events[i].endDate
            ) {
              console.log("diapazon work");
              dateIsBusy = true;
              // this.dateAlreadyTaken = true;
              break;
            } else {
              if (
                (this.eventData.startDate >= this.events[i].startDate &&
                  this.eventData.startDate <= this.events[i].endDate) ||
                (this.eventData.startDate <= this.events[i].endDate &&
                  this.eventData.startDate >= this.events[i].startDate) ||
                (this.eventData.endDate >= this.events[i].startDate &&
                  this.eventData.endDate <= this.events[i].endDate)
              ) {
                console.log("we cant reg");
                // this.dateAlreadyTaken = true;
                dateIsBusy = true;
                break;
              } else {
                console.log("reged succes");
                // await this.addEvent(this.eventData);
                // this.$router.push({
                //   name: "userInfoPage",
                //   params: { id: this.$route.params.userId },
                // });
              }
            }
          }

          if (!dateIsBusy) {
            console.log("saved to db");
            await this.addEvent(this.eventData);
            this.$router.push({
              name: "userInfoPage",
              params: { id: this.$route.params.userId },
            });
          } else {
            this.dateAlreadyTaken = true;
          }
        }
      }
    },
  },

  async mounted() {
    await this.loadEvents(this.$route.params.userId);
  },
};
</script>

<style lang="scss" scoped></style>
