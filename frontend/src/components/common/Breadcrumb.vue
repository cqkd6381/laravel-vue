<template>
  <a-breadcrumb :routes="routes">
    <template slot="itemRender" slot-scope="{route, params, routes, paths}">
      <span v-if="routes.indexOf(route) === routes.length - 1">{{route.breadcrumbName}}</span>
      <router-link v-else :to="`${basePath}/${paths.join('/')}`">{{route.breadcrumbName}}</router-link>
    </template>
  </a-breadcrumb>
</template>
<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    const { lang } = this.$route.params;
    return {
      basePath: `${lang ? lang : ""}`
    };
  }
};
</script>