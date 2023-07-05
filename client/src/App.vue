<template>
  <header>
    <h3>DevLarry</h3>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style scoped>
* {
  @apply p-0 m-0 box-border;
}
a {
  @apply text-lg p-1 h-full hover:bg-slate-100 flex items-center px-5;
}
nav {
  @apply h-full ml-auto flex items-center;
}
h3 {
  @apply text-lg font-semibold;
}
header {
  @apply flex px-3 py-0 shadow-md border border-[#f1f1f1] h-16 items-center;
}
</style>
