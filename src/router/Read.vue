<template>
  <div class="container">
    <div class="read-title">
      {{ $route.params.title }}
    </div>
    <div class="read-description">
      {{ $route.params.description }}
    </div>

    <div class="button-area">
      <button @click="modifyHandler">
        수정
      </button>
      <button @click="deleteHandler">
        삭제
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    modifyHandler() {
      let id = this.$route.params.id;
      let title = this.$route.params.title;
      let description = this.$route.params.description;

      this.$router.push({
        name: 'Add',
        params: {
          mode: 'modify',
          contentId: id,
          title,
          description,
        },
      })
    },
    async deleteHandler() {
      let id = this.$route.params.id;
      await this.$http.post('/api/delete', { id })
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
@import '~/scss/main';
.container {
  width: 85%;
  height: 75vh;
  .read-title {
    height: 75px;
    display: flex;
    align-items: center;
  }
  .read-description {
    height: 300px;
  }
  button {
    margin-right: 5px;
  }
}
</style>