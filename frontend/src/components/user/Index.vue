<template>
  <div>
    <ul>
      <ol v-for="log in logs" :key="log.id">{{ log.user_id }} - {{ log.operation }}</ol>
    </ul>
  </div>
</template>

<script>
import { logs } from "@/api/login";
export default {
  name: "Index",
  data() {
    return {
      logs: []
    };
  },
  methods: {
    getLogs() {
      logs()
        .then(res => {
          if (res.status_code === 200) {
            this.logs = res.entity.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  mounted() {
    this.getLogs();
  }
};
</script>

<style scoped>
</style>