<template>
  <div class="container">
    <div class="contents">
      <div
        class="content"
        v-for="content in contents"
        :key="content">
        <span class="content-id">{{ content.id }}</span>
        <span class="content-title">{{ content.title }}</span>
        <span class="content-author">{{ content.author }}</span>
      </div>
    </div>
    <div class="btn-container">
      <RouterLink to="/add">
        <button>글쓰기</button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import Contents from '~/data/contents.json';

export default {
  computed: {
    contents() {
      const res = JSON.parse(JSON.stringify(Contents));
      return res;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';

.container {
  width: 85%;
  height: 75vh;
  .contents {
    height: 70vh;
    .content {
      height: 40px;
      display: flex;
      align-items: center;
      &:hover {
        background-color: rgb(218, 218, 218);
      }
      & > span {
        display: inline-block;
        border-right: 1px solid #000;
        box-sizing: border-box;
        padding-left: 20px;
      }
      & > span:last-child {
        border-right: none;  
      }
      .content-id {
        width: 10%;
      }
      .content-title {
        width: 70%;
        text-align: left;
      }
      .content-author {
        width: 20%;
      }
    }
  }
  .btn-container {
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    // button {
    //   // width: 70px;
    //   // height: 40px;
    //   // border-radius: 10px;
    //   margin-left: 30px;
    // }
  }
}
</style>