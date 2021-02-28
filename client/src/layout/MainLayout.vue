<template>
  <a-layout id="components-layout-demo-responsive">
    <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
      <div class="logo">交易流量策略</div>
      <a-menu theme="dark" mode="inline" v-model="selectedPath">
        <a-menu-item :key="route.path" v-for="route in routes">
          <router-link :to="{ path: route.path }">
            <a-icon :type="route.icon" />
            <span class="nav-text">{{ route.title }}</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <div :style="{ padding: '24px', background: '#fff', minHeight: '87.9vh' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="textAlign: center">
        交易流量策略 ©{{ new Date().getFullYear() }} Created by jingping.ye
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      selectedPath: [],
      routes: [
        {
          path: "/wap",
          icon: "mobile",
          title: "手机版",
        },
        {
          path: "/web",
          icon: "laptop",
          title: "web版",
        },
      ],
    };
  },
  watch: {
    $route: {
      handler(newV) {
        if (newV) {
          this.selectedPath = [newV.path];
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
};
</script>

<style>
#components-layout-demo-responsive .logo {
  height: 32px;
  margin: 16px;
  color: #fff;
  font-size: 26px;
}
</style>
