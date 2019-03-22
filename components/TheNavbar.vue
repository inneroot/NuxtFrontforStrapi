<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">
      <nuxt-link to="/posts">Posts</nuxt-link>
    </el-menu-item>
    <el-menu-item index="2">
      <nuxt-link to="/posts/1">Post 1</nuxt-link>
    </el-menu-item>
    <el-menu-item index="3">
      <nuxt-link to="/posts/2">Post 2</nuxt-link>
    </el-menu-item>
    <el-menu-item index="4">
      <nuxt-link to="/">Home</nuxt-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>