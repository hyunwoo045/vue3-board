# 게시판 만들기

Vue.js 와 데이터베이스 (MySQL)의 학습을 주 목적으로 진행하는 프로젝트 입니다.

문서는 공부한 내용을 정리하는 방식으로 작성합니다.

<br />

## ~ 8. 20. 진행 현황

### 성과

- Front 개발 환경 구축
- 홈 페이지(글 목록 출력) 및 글쓰기 페이지 기능 구현 (스타일 구현 필요)
- MySQL의 설치
- SQL 기초 개념 학습
- MySQL Workbench 설치

자세한 학습 기록은 [docs/mysql/database](https://github.com/hyunwoo045/vue3-board/tree/master/docs/mysql/database) 에 기록합니다.

### 8. 20 목표

- Backend 환경 구축
- API 요청 / 응답 구현
- Database 연결

## 기록 (08. 20)

### Backend 환경 구축

Backend의 Git 레파지토리를 우선 따로 구분합니다. 나중에 통합합니다. [저장소](https://github.com/hyunwoo045/vue3-board-express)

Express 로 백엔드 개발 환경을 구축합니다.

```bash
$ npm i express-generator -g
$ express backend --view=pug
$ cd backend
$ npm i
$ npm start
```

테스트를 위한 JSON 데이터를 임시로 작성합니다.

```json
// ./fortest.json
[
  {
    "id": 1,
    "title": "NodeJs",
    "description": "NodeJS is ...",
    "author": "Apple",
    "password": "apple"
  },
  {
    "id": 2,
    "title": "MySQL",
    "description": "MySQL is ...",
    "author": "Banana",
    "password": "1234"
  },
  {
    "id": 3,
    "title": "Vue",
    "description": "Vue.js is ...",
    "author": "Cherry",
    "password": "1111"
  }
]
```

`routes` 디렉토리에 test.js 파일을 하나 생성한 후 아래와 같이 작성합니다.

```javascript
var express = require("express");
var router = express.Router();
var data = require("../fortest.json");

router.get("/", function (req, res, next) {
  res.send(data);
});

module.exports = router;
```

- 요청이 들어올 경우 fortest.json 의 데이터를 response.

마지막으로 `./app.js` 에 라우터를 선언 및 연결해 줍니다.

```javascript
// ...
var testRouter = require("./routes/test");
app.use("/api/test", testRouter);
```

### API 요청 / 응답 구현

프론트엔드 측에서 백엔드 측 데이터를 받아올 수 있도록 설정할 필요가 있어 환경을 구축해보려 하였습니다. 데이터베이스 자료를 백엔드 환경에서 제공할 수 있도록 하게 하기 위함입니다.

Backend 환경에서 데이터를 받기 위해서 직접 `localhost:3000/api/test` 와 같은 방식으로 받아오려 했으나, 오류가 발생하였습니다.

```javascript
// ~/router/Container.vue

// 오류 코드
export default {
  created() {
    this.$http.get("localhost:3000/api/test").then((response) => {
      console.log(response);
    });
  },
};
```

원인은 CORS (Cross Origin Resource Sharing) 이라고 하는 브라우저-서버 간의 보안 정책 때문인 듯합니다. [참고 자료](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html#23-%EC%8B%A4%EC%A0%9C-api-%EC%97%B0%EB%8F%99-devserverproxy)

검색 자료를 바탕으로 `webpack.config.js` 를 수정하여 프록싱이 가능하도록 설정하였습니다.

```javascript
module.exports = {
  // ....
  devServer: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
};
```

- 개발서버에 들어온 http 요청 중 /api 로 시작되는 것은 `localhost:3000' 으로 요청하도록 합니다.

```javascript
// ~/router/Container.vue

// 오류 코드
export default {
  created() {
    this.$http.get("/api/test").then((response) => {
      console.log(response);
    });
  },
};
```

<br />

## 8.23 목표

- Frontend 요청에 의한 database CRUD 구현

### Read

글 목록에서 글을 클릭 시 글 상세보기 기능 구현합니다.

클릭 시 vue-router 의 router-link 를 통해 페이지가 변환되고 글 상세 정보가 출력됩니다.

```html
<template>
  <div class="container">
    <div class="contents">
      <div
        class="content"
        v-for="content in contents"
        :key="content"
        @click="readContent(content.id)"
      >
        <span class="content-id">{{ content.id }}</span>
        <span class="content-title">{{ content.title }}</span>
        <span class="content-author">{{ content.author_id }}</span>
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
  export default {
    // data ...
    // created ...
    methods: {
      readContent(id) {
        this.$http.get(`/api/home?id=${id}`).then((response) => {
          let data = response.data[0];
          this.$router.push({
            name: "Read",
            params: {
              title: data.title,
              description: data.description,
            },
          });
        });
      },
    },
  };
</script>
```

```html
<div
  class="content"
  v-for="content in contents"
  :key="content"
  @click="readContent(content.id)"
></div>
```

- 글 클릭 시 readContent 메서드로 글의 id 값을 전달합니다.

```javascript
this.$http.get(`/api/home?id=${id}`).then((response) => {
  let data = response.data[0];
  this.$router.push({
    name: "Read",
    params: {
      title: data.title,
      description: data.description,
    },
  });
});
```

- `/api/home` 에 api query 로 id 값에 대한 요청을 보내어 응답을 전달 받습니다.
- 전달받은 데이터는 vue-router 를 이용하여 read 페이지로 보냄과 동시에 필요한 데이터를 전달합니다. 전달 방식은 [참고 자료](https://velog.io/@skyepodium/vue-router%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC%ED%95%98%EA%B8%B0-eskrsmr3) 를 참고 합니다.

```html
<template>
  <div class="container">
    <div class="read-title">{{ $route.params.title }}</div>
    <div class="read-description">{{ $route.params.description }}</div>
  </div>
</template>
```

- `index.js` 에 `Read` 컴포넌트를 등록합니다 (코드 생략)
- `Read.vue` 컴포넌트를 간략히 위와 같이 구현합니다.
- `$route.params.속성명` 으로 전달받은 데이터를 사용할 수 있습니다.

쿼리를 포함한 요청에 대한 처리를 하기 위해서 백엔드 파트의 `routes/home.js` 를 아래와 같이 수정합니다.

```javascript
// require part ...
var url = require("url");

router.get("/", (req, res) => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });
  connection.connect();

  let _url = req.url;
  let queryData = url.parse(_url, true).query;

  if (queryData.id === undefined) {
    connection.query("SELECT * FROM topic", function (err, topic) {
      if (err) {
        throw err;
      }
      res.send(topic);
    });
  } else {
    connection.query(
      `SELECT * FROM topic WHERE id=?`,
      [queryData.id],
      function (err, topic) {
        if (err) {
          throw err;
        }
        res.send(topic);
      }
    );
  }
});
```

- 내장 모듈인 `url` 을 받아 query문을 파싱하는 데 사용합니다.
- `url.parse(URL, ).query` 는 url의 쿼리파트에 해당하는 부분을 객체로 반환합니다.
- `url.parse(URL, ).query.id` 를 통해 front 에서 전달받은 id 값을 이용하여 데이터베이스에 쿼리를 전송 및 데이터를 전달받아 응답을 보냅니다.
