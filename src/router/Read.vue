<template>
  <div class="container">
    <div class="read-title">
      {{ $route.params.title }}
    </div>
    <div class="read-description">
      {{ $route.params.description }}
    </div>
  </div>
</template>

<script>
export default {


}
</script>

<style lang="scss">
@import '~/scss/main';
.container {
  width: 85%;
  height: 75vh;
}
</style>