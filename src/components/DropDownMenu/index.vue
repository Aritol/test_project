<template>
  <div>
    <section class="container">
      <div class="main_wrapper">
        <div
          class="dropdown_header"
          @click="onDropDownClick"
          @keyup.enter.prevent="onDropdownListItemClick()"
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
              @keyup.enter.prevent="onDropdownListItemClick()"
              @keyup.up.prevent="highlightPrevious"
              @keyup.down.prevent="highlightNext(filteredDropDownList.length)"
            />
          </div>
          <ul
            class="dropdown_list_item"
            v-for="(item, index) in filteredDropDownList"
            :key="item.id"
            @click="onDropdownListItemClick()"
            @mouseover="highlightedIndex = index"
            ref="options"
            :class="{
              selected_item: isCurrentIndex(index),
            }"
          >
            <li>{{ item.id }}.</li>
            <li>{{ item.firstName }} {{ item.lastName }}</li>
          </ul>
          <div class="no_results_container" v-if="!filteredDropDownList.length">
            <p>No results found</p>
          </div>
        </div>
      </div>
    </section>
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

      searchTitle: null,

      highlightedIndex: -1,
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

    highlightPrevious() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex -= 1;

        this.fixScrolling();
      }
    },

    highlightNext(resultCount) {
      if (this.highlightedIndex < resultCount - 1) {
        this.highlightedIndex += 1;
        if (this.highlightedIndex > 8) {
          this.fixScrolling();
        }
      }
    },

    isCurrentIndex(index) {
      return index === this.highlightedIndex;
    },

    onDropdownListItemClick() {
      const fullTitle = `${
        this.filteredDropDownList[this.highlightedIndex].firstName
      } ${this.filteredDropDownList[this.highlightedIndex].lastName}`;
      this.title = fullTitle;
      this.dropDownActive = false;
    },

    fixScrolling() {
      if (this.highlightedIndex <= 9) {
        this.$refs.scrollContainer.scrollTop = -20;
      } else {
        const liH = this.$refs.options[this.highlightedIndex].clientHeight;
        this.$refs.scrollContainer.scrollTop = liH * this.highlightedIndex;
      }
    },

    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.dropDownActive = false;
      }
    },
  },

  async mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
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

  width: 370px;
}

.main_wrapper {
  cursor: pointer;
  .dropdown_header {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    .title_container {
      margin-top: 4px;
    }
  }
}

.img_container {
  margin-left: 110px;
  img {
    transition: transform 0.4s ease-in-out;
  }
  .open {
    transform: rotateZ(-180deg);
  }
}

.dropdown_list_container {
  border-top: 3px solid #dfe1f0;
  height: 100%;
  max-height: 450px;
  overflow: auto;
}

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
}

.selected_item {
  background-color: #4aae9b;
}

.no_results_container {
  padding: 10px;
}
</style>
