<template>
  <div class="container">
    <div class="input-area top">
      <input
        v-model="author"
        type="text"
        class="name"
        placeholder="닉네임" />
      <input
        type="password"
        class="password"
        placeholder="비밀번호" />
    </div>
    <div class="input-area title">
      <input
        v-model="title"
        type="text"
        class="title"
        placeholder="제목" />
    </div>
    <div class="input-area description">
      <textarea
        v-model="description"
        class="description"></textarea>
    </div>
    
    <div class="button-area">
      <button
        class="cancel"
        @click="back">
        취소
      </button>
      <button
        class="submit"
        @click="createHandler">
        확인
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: '',
      password: '',
      title: '',
      description: '',
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    createHandler() {
      this.$http.post('/api/create', {
        author: this.author,
        password: this.password,
        title: this.title,
        description: this.description,
      }).then(response => {
        console.log(response.data);
        this.$router.push('/');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';

.container {
  padding: 20px 20px;
  box-sizing: border-box;
  width: 85%;
  height: 75vh;
  .input-area {
    margin-bottom: 8px;
    // &:last-child {
    //   margin-bottom: 0;
    // }
    & > input {
      margin-right: 8px;
    }
    & > .title {
      width: 500px;
    }
    & > .description {
      width: 500px;
      height: 400px;
    }
  }
  button {
    margin-right: 8px;
  }
}

</style>