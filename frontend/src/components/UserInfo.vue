<template>
  <div>
    <div>
      这里是个人中心
      <a @click="logout">退出</a>
    </div>
    <ul>
      <ol v-for="log in logs" :key="log.id">{{ log.user_id }} - {{ log.operation }}</ol>
    </ul>
  </div>
</template>

<script>
import { logs } from "@/api/login";
export default {
  name: "UserInfo",
  data() {
    return {
      logs: []
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(res => {
        if (res.status_code === 200) {
          this.$router.push({ name: "login" });
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
    },
    getLogs() {
      logs()
        .then(res => {
          this.logs = res.entity.data;
          // console.log(res);
        })
        .catch();
    }
  },
  mounted() {
    this.getLogs();
  }
};
</script>

<style scoped>
</style>