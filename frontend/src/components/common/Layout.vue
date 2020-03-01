<template>
  <a-layout id="components-layout-demo-custom-trigger" style="min-height: 100vh">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo"></div>
      <a-menu
        theme="dark"
        mode="inline"
        :defaultSelectedKeys="defaultSelectedKeys"
        :defaultOpenKeys="defaultOpenKeys"
      >
        <template v-for="menu in menus">
          <a-sub-menu v-if="menu.show" :key="menu.key">
            <span slot="title">
              <a-icon :type="menu.icon" />
              <span>{{ menu.title }}</span>
            </span>
            <a-menu-item v-for="menu_one in menu.children" :key="menu_one.key">
              <router-link :to="{ name: menu_one.key}">{{ menu_one.title }}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />

        <a-dropdown style="padding:0 10px;">
          <a class="ant-dropdown-link" style="float:right;margin-right:16px;position:relative;">
            <img
              src="@/assets/logo.jpg"
              alt="avatar"
              style="height:24px;width:24px;border-radius:12px;"
            />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link :to="{ name: 'userinfo' }">
                <a-icon type="user" />&nbsp;个人中心
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <a @click="logout">
                <a-icon type="logout" />&nbsp;退出登录
              </a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>{{ userInfo.name }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>

      <div :style="{ margin: '16px 16px', padding: '8px 16px', background: '#fff' }" v-show="true">
        <Breadcrumb :routes="breadRoutes" />
      </div>

      <a-layout-content
        :style="{ margin: '0 16px 16px 16px', padding: '16px', background: '#fff', minHeight: 'calc(100% - 150px)' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      menus: [
        {
          key: "sub0",
          title: "全局",
          icon: "home",
          show: false,
          children: [
            {
              key: "userinfo",
              title: "个人中心"
            }
            // {
            //   key: "",
            //   title: "增量统计"
            // }
          ]
        },
        {
          key: "sub1",
          title: "统计",
          icon: "bar-chart",
          show: true,
          children: [
            {
              key: "statistic_global",
              title: "全局统计"
            },
            {
              key: "statistic_increment",
              title: "增量统计"
            }
          ]
        },
        {
          key: "sub2",
          title: "用户",
          icon: "user",
          show: true,
          children: [
            {
              key: "user_list",
              title: "用户列表"
            }
            // {
            //   key: "",
            //   title: "登录日志"
            // }
          ]
        },
        {
          key: "sub3",
          title: "系统",
          icon: "setting",
          show: true,
          children: [
            {
              key: "setting_role",
              title: "系统角色"
            },
            {
              key: "setting_user",
              title: "系统用户"
            }
          ]
        }
      ]
    };
  },
  computed: {
    breadRoutes() {
      const routes = [];
      this.menus.map((item, index) => {
        item.children.map(it => {
          if (it.key === this.$route.name) {
            routes.push({
              breadcrumbName: item.title
            });
            routes.push({
              path: it.key,
              breadcrumbName: it.title
            });
          }
        });
      });
      return routes;
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    defaultSelectedKeys() {
      return [this.$route.name];
    },
    defaultOpenKeys() {
      const openKey = [];
      const name = this.$route.name;
      this.menus.map((item, index) => {
        item.children.map(it => {
          if (it.key === name) {
            openKey.push(item.key);
          }
        });
      });
      return openKey;
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(res => {
          if (res.status_code === 200) {
            this.$router.push({ name: "login" });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  },
  components: {
    Breadcrumb: () => import("./Breadcrumb")
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
