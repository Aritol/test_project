<template>
  <div>
    <drop-down-menu />
  </div>
</template>

<script>
import DropDownMenu from "@/components/DropDownMenu";

export default {
  name: "App",
  components: {
    DropDownMenu,
  },
};
</script>

<style>
@import "@/assets/styles/null.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50;
  margin-top: 60px; */
}
</style>
