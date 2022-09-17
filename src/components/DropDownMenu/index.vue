<template>
  <div>
    <div class="container">
      <div class="main_wrapper">
        <div class="dropdown_header" @click="onDropDownClick">
          <div class="title_container">
            <!-- <p>Select menu item</p> -->
            <p>{{ title }}</p>
          </div>
          <div class="img_container">
            <img
              src="@/assets/icons/down_arrow_black.png"
              alt=""
              :class="{
                open: dropDownActive,
              }"
            />
          </div>
        </div>

        <div class="dropdown_list_container" v-if="dropDownActive">
          <div class="input_container">
            <img src="@/assets/icons/icon_search.png" alt="" /><input
              type="text"
              placeholder="Find"
              v-model.trim="searchTitle"
              ref="search"
            />
          </div>
          <div
            class="dropdown_list_item"
            v-for="item in filteredDropDownList"
            :key="item.id"
            @click="onDropdownListItemClick(item)"
            @focus="method1"
            @keyup.up="method1()"
            @keyup.down="method2()"
          >
            <p>{{ item.id }}.</p>

            <p ref="dropdown_list_item">
              {{ item.firstName }} {{ item.lastName }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDownMenu",

  data() {
    return {
      title: "Select menu item",
      dropDownActive: false,
      dropDownList: [],
      serverResponse: [],

      searchTitle: null,
    };
  },
  computed: {
    filteredDropDownList() {
      if (this.searchTitle) {
        const titleInLowerCase = this.searchTitle.toLowerCase();

        return this.dropDownList.filter((el) => {
          const fullName = `${el.firstName.toLowerCase()} ${el.lastName.toLowerCase()}`;
          return fullName.includes(titleInLowerCase);
        });
      }
      return this.dropDownList;
    },
  },

  methods: {
    onDropDownClick() {
      this.dropDownActive = !this.dropDownActive;

      this.$nextTick(function () {
        // console.log(this.$refs["search"]);
        this.$refs["search"].focus();
        // this.$refs.dropdown_list_item.$el.focus();
      });
    },

    onDropdownListItemClick(item) {
      this.title = `${item.firstName} ${item.lastName}`;
      this.dropDownActive = false;
    },
    hideSelect() {
      this.dropDownActive = false;
      console.log("hided");
    },

    method1() {
      console.log(1);
    },
    method2() {
      console.log(2);
    },
  },

  async mounted() {
    this.serverResponse = await fetch(
      "https://dummyjson.com/users?&limit=50"
    ).then((response) => response.json());

    this.dropDownList = this.serverResponse.users;

    // document.addEventListener("click", this.hideSelect.bind(this), true);
  },

  // beforeUnmount() {
  //   document.removeEventListener("click", this.hideSelect);
  // },
};
</script>

<style lang="scss" scoped>
.container {
  -webkit-user-select: none;
  font-size: 20px;
  border: 3px solid #dfe1f0;
  width: 100%;
  //   height: 100%;
  max-width: 400px;
  //   max-height: 30px;
  .main_wrapper {
    cursor: pointer;
    .dropdown_header {
      padding: 10px 10px;
      display: flex;
      justify-content: space-between;
      .title_container {
        margin-top: 4px;
      }
      .img_container {
        img {
          transition: transform 0.4s ease-in-out;
          //   margin-top: 10px;
        }
        .open {
          transform: rotateZ(-180deg);
        }
      }
    }

    .dropdown_list_container {
      border-top: 3px solid #dfe1f0;
      height: 100%;
      max-height: 400px;
      overflow: auto;
      .input_container {
        border-bottom: 3px solid #dfe1f0;

        padding: 10px;
        display: flex;
        img {
          margin-top: 2px;
          width: 25px;
          height: 25px;
        }
        input {
          margin-left: 10px;
          border: 2px solid #dfe1f0;
          padding: 2px 5px;
          font-size: 18px;
          transition: 0.3s;

          &:focus {
            border: 2px solid #f5c002;
          }
        }
      }

      .dropdown_list_item {
        //   margin: 5px 10px;
        padding: 10px 10px;
        display: flex;
        p {
          margin-right: 10px;
        }
        &:hover {
          background-color: #f6f8fd;
        }
      }
    }
  }
}
</style>
