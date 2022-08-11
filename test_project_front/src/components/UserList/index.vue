<template>
  <div>
    <div class="container">
      <div class="main_wrapper">
        <div class="filter_field">
          <label for="">Search:</label>
          <input type="text" v-model="searchTitle" @input="onInputChange" />
        </div>
        <div class="sort_buttons_container">
          <button @click="sortByName">Sort by name</button>
          <button @click="sortByLastName">Sort by last name</button>
          <button @click="sortByEmail">Sort by email</button>
          <button @click="sortByPhoneNumber">Sort by phone numbers</button>
          <button @click="sortByEventsCount">Sort by events count</button>
          <button @click="sortByEventStartDate">
            Sort by event start date
          </button>
        </div>
        <table class="user_list_table" border="2px">
          <tbody>
            <tr>
              <th>User name</th>
              <th>User last name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Events count</th>
              <th>Next event start date</th>
            </tr>

            <user-list-item
              v-for="user in filteredUserList"
              :key="user._id"
              :user="user"
              @click="onUserClick(user._id)"
            />
          </tbody>
        </table>

        <div class="pagination_container">
          <div
            class="page"
            v-for="page in pages"
            :key="page"
            @click="onPageClick(page)"
          >
            {{ page }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserListItem from "@/components/UserList/UserListItem";
export default {
  name: "UserList",
  components: {
    UserListItem,
  },

  data() {
    return {
      searchTitle: null,
      myUsers: [],
      myEvents: {},

      usersPerPage: 3,
      pageNumber: 1,
    };
  },

  computed: {
    ...mapGetters("users", ["users"]),

    isFiltering() {
      if (this.searchTitle) {
        return true;
      } else return false;
    },

    pages() {
      return Math.ceil(this.users.length / 3);
    },
    paginatedUsers() {
      let from = (this.pageNumber - 1) * this.usersPerPage;
      let to = from + this.usersPerPage;
      return this.myUsers.slice(from, to);
    },

    // }

    // filteredUserList() {
    //   let from = (this.pageNumber - 1) * this.usersPerPage;
    //   let to = from + this.usersPerPage;
    //   if (this.searchTitle) {
    //     // return this.users.slice(from, to);
    //     const filtered = this.users.filter((user) => {
    //       const fullString = `${user.name} ${user.lastName} ${user.email} ${user.phoneNumber}`;
    //       return fullString.includes(this.searchTitle);
    //     });
    //     return filtered.slice(from, to);
    //   } else return this.users.slice(from, to);
    // },

    filteredUserList() {
      let from = (this.pageNumber - 1) * this.usersPerPage;
      let to = from + this.usersPerPage;
      if (this.searchTitle) {
        // return this.users.slice(from, to);
        const filtered = this.myUsers.filter((user) => {
          const fullString = `${user.name} ${user.lastName} ${user.email} ${user.phoneNumber} ${user.eventsCount} ${user.eventStartDate}`;
          return fullString.includes(this.searchTitle);
        });
        return filtered.slice(from, to);
      } else return this.myUsers.slice(from, to);
    },
    // filteredUserList() {
    //   let from = (this.pageNumber - 1) * this.usersPerPage;
    //   let to = from + this.usersPerPage;
    //   if (this.searchTitle) {
    //     // return this.users.slice(from, to);
    //     const filtered = this.myUsers.filter((user) => {
    //       const fullString = `${user.name} ${user.lastName} ${user.email} ${
    //         user.phoneNumber
    //       }
    //       ${user.events.forEach()}`;
    //       return fullString.includes(this.searchTitle);
    //     });
    //     if (filtered.length) {
    //       console.log("filtered");
    //       console.log(filtered);
    //       return filtered.slice(from, to);
    //     } else {
    //       for (let i = 0; i < this.myUsers.length; i++) {
    //         for (let j = 0; j < this.myUsers[i].events.length; j++) {
    //           const filteredDates = this.myUsers[i].events.filter((el) => {
    //             const string = `${el.startDate} ${el.endDate}`;
    //             console.log("string");
    //             console.log(string);
    //             return string.includes(this.searchTitle);
    //           });
    //           return filteredDates.slice(from, to);
    //         }
    //       }
    //       return this.myUsers.slice(from, to);
    //     }
    //   } else return this.myUsers.slice(from, to);
    // },
  },

  methods: {
    ...mapActions("users", ["loadUsers"]),
    ...mapActions("events", ["loadAllEvents"]),

    onInputChange() {
      this.pageNumber = 1;
    },

    onUserClick(userId) {
      this.$router.push({ name: "userInfoPage", params: { id: userId } });
    },

    onPageClick(page) {
      this.pageNumber = page;
    },

    sortByName() {
      this.myUsers.sort((a, b) => a.name.localeCompare(b.name));
    },
    sortByLastName() {
      this.myUsers.sort((a, b) => a.lastName.localeCompare(b.lastName));
    },

    sortByEmail() {
      this.myUsers.sort((a, b) => a.email.localeCompare(b.email));
    },
    sortByPhoneNumber() {
      this.myUsers.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
    },

    sortByEventsCount() {
      this.myUsers.sort((a, b) => a.eventsCount - b.eventsCount);
    },
    sortByEventStartDate() {
      this.myUsers.sort((a, b) =>
        a.eventStartDate.localeCompare(b.eventStartDate)
      );
    },
    addEventsCountToUsers() {
      this.myUsers.forEach((element, index) => {
        this.myUsers[index].eventsCount = element.events.length;
      });
    },
    addEventStartDate() {
      for (let i = 0; i < this.myUsers.length; i++) {
        if (this.myUsers[i].events.length > 0) {
          this.myUsers[i].eventStartDate = this.myUsers[i].events[0].startDate;
        } else {
          this.myUsers[i].eventStartDate = "No Events";
        }
      }
    },
  },

  async mounted() {
    await this.loadUsers();

    this.myUsers = await this.users;
    // console.log(this.myUsers);
    // console.log(this.users.length);
    this.myEvents = await this.loadAllEvents();
    this.myList;
    this.myUsers.events = [];
    for (let i = 0; i < this.myUsers.length; i++) {
      this.myUsers[i].events = [];
    }
    // console.log("this.myUsers.events");
    // console.log(this.myUsers.events);
    this.myUsers.forEach((element, index) => {
      this.myEvents.forEach((el) => {
        if (el.userId == element._id) {
          this.myUsers[index].events.push(el);
        }
      });
    });

    this.addEventsCountToUsers();
    this.addEventStartDate();
  },
};
</script>

<style lang="scss" scoped>
.pagination_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .page {
    padding: 6px;
    border: solid 3px #e7e7e7;
    margin-right: 5px;
    &:hover {
      background: #aeaeae;
      cursor: pointer;
    }
  }
}

.user_list_table {
  margin: 0 auto;
}

.sort_buttons_container {
  display: flex;
  justify-content: center;
  margin-left: -56px;
  button {
    // margin: 0 auto;
    text-align: center;
    // margin-left: 20px;
  }
}
</style>
