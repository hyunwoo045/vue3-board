<template>
  <Header />
  <RouterView />
</template>

<script>
import Header from '~/components/Header';
export default ({
  components: {
    Header,
  },

  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})
</script>
