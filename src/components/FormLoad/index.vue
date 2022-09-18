<template>
  <div>
    <drop-down-menu :dropDownList="serverResponse.users" />
  </div>
</template>

<script>
import DropDownMenu from "@/components/DropDownMenu";
export default {
  name: "FormLoad",

  components: {
    DropDownMenu,
  },

  data() {
    return {
      serverResponse: [],
    };
  },
  async created() {
    try {
      this.serverResponse = await fetch(
        "https://dummyjson.com/users?&limit=50"
      ).then((response) => response.json());
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped></style>
