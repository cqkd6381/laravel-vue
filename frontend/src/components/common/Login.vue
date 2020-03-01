<template>
  <div>
    <form @submit.prevent="login">
      <label for="email" required>email</label>
      <input type="text" id="email" v-model="username" />
      <br />
      <label for="password" required>password</label>
      <input type="password" id="password" v-model="password" />
      <br />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.status_code === 200) {
            this.$router.push({ name: "userinfo" });
          } else if (res.status_code === 421) {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>

<style scoped>
</style>