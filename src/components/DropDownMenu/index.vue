<template>
  <div>
    <div class="container">
      <div class="main_wrapper">
        <div
          class="dropdown_header"
          @click="onDropDownClick"
          @keyup.enter.prevent="goToDoc(filteredDropDownList)"
          @keyup.up.prevent="highlightPrevious"
          @keyup.down.prevent="highlightNext(filteredDropDownList.length)"
        >
          <div class="title_container">
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

        <div
          class="dropdown_list_container"
          id="dropdown_list_container"
          v-if="dropDownActive"
          ref="scrollContainer"
        >
          <div class="input_container">
            <img src="@/assets/icons/icon_search.png" alt="" /><input
              type="text"
              placeholder="Find"
              v-model.trim="searchTitle"
              ref="search"
              @keyup.enter.prevent="goToDoc(filteredDropDownList)"
              @keyup.up.prevent="highlightPrevious"
              @keyup.down.prevent="highlightNext(filteredDropDownList.length)"
            />
          </div>
          <div
            class="dropdown_list_item"
            v-for="(item, index) in filteredDropDownList"
            :key="item.id"
            @click="onDropdownListItemClick(item)"
            @mouseover="highlightedIndex = index"
            ref="options"
            @keyup.up="someMethod"
            :class="{
              selected_item: isCurrentIndex(index),
            }"
          >
            <p>{{ item.id }}.</p>
            <p>{{ item.firstName }} {{ item.lastName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDownMenu",

  props: {
    dropDownList: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      title: "Select menu item",
      dropDownActive: false,
      // dropDownList: [],
      // serverResponse: [],

      searchTitle: null,

      highlightedIndex: -1,

      arrowCounter: 0,
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

      if (this.dropDownActive) {
        this.$nextTick(function () {
          this.$refs.search.focus();
        });
      }
    },

    onDropdownListItemClick(item) {
      this.title = `${item.firstName} ${item.lastName}`;
      this.dropDownActive = false;
    },

    highlightPrevious() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex -= 1;
        this.arrowCounter = this.arrowCounter - 1;
        this.fixScrolling();
      }
    },

    highlightNext(resultCount) {
      if (this.highlightedIndex < resultCount - 1) {
        this.highlightedIndex += 1;
        this.arrowCounter = this.arrowCounter + 1;
        if (this.highlightedIndex > 8) {
          this.fixScrolling();
          // this.arrowCounter = 0;
        }
      }
    },

    isCurrentIndex(index) {
      return index === this.highlightedIndex;
    },

    goToDoc(dropDownList) {
      const fullTitle = `${dropDownList[this.highlightedIndex].firstName} ${
        dropDownList[this.highlightedIndex].lastName
      }`;
      this.title = fullTitle;
      this.dropDownActive = false;
    },

    fixScrolling() {
      const liH = this.$refs.options[this.highlightedIndex].clientHeight;
      this.$refs.scrollContainer.scrollTop = liH * this.arrowCounter;
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.dropDownActive = false;
        this.arrowCounter = -1;
      }
    },
  },

  async mounted() {
    // this.serverResponse = await fetch(
    //   "https://dummyjson.com/users?&limit=50"
    // ).then((response) => response.json());

    // this.dropDownList = this.serverResponse.users;
    document.addEventListener("click", this.handleClickOutside);
  },

  // beforeUnmount() {
  //   // document.removeEventListener("click", this.hideSelect);
  // },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style lang="scss" scoped>
.container {
  -webkit-user-select: none;
  font-size: 20px;
  border: 3px solid #dfe1f0;
  // width: 100%;
  //   height: 100%;
  width: 370px;
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
      max-height: 450px;
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
        padding: 10px 10px;
        display: flex;
        p {
          margin-right: 10px;
        }
        // &:hover {
        //   background-color: #f6f8fd;
        // }
      }

      .selected_item {
        background-color: #4aae9b;
      }
    }
  }
}
</style>
