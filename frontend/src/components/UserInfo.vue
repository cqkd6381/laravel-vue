<template>
  <div>
    <div>
      这里是个人中心
      <a @click="logout">退出</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(res => {
        if (res.status_code === 200) {
          this.$router.push({ name: "index" });
        } else {
          // this.$message({
          //   type: "error",
          //   message: res.message
          // });
        }
      });
      // .catch(err => {
      //   this.$message({
      //     type: "error",
      //     message: err
      //   });
      // });
    }
  }
};
</script>

<style scoped>
</style>