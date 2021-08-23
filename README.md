# 게시판 만들기

Vue.js 와 데이터베이스(MySQL), 클라우드 서버(AWS) 학습을 주 목적으로 진행하는 프로젝트 입니다.

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

글 목록에서 글을 클릭 시 글 상세보기 기능을 구현합니다.

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

### Create

글쓰기 버튼을 통해 이동된 페이지에서 글 작성 후 확인 버튼을 클릭 하였을 때에 데이터베이스에 새로운 글 내용이 업데이트 되도록 구현합니다.

`Add` 컴포넌트에 `createHandler()` 메서드를 추가합니다. <br />
메서드 내용은 아래와 같습니다.

```javascript
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
```

- axios 패키지의 post 기능을 이용하여 POST 방식으로 서버에 데이터를 전송하며 요청합니다.
- 응답을 받을 경우 다시 홈 화면으로 이동합니다.

백엔드 부분에 `create` 라우터를 새로 만듭니다.

```javascript
// require part 생략 ...

router.post("/", function (req, res) {
  let title = req.body.title;
  let description = req.body.description;
  let author_id = 1;

  let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "111111",
    database: "tutorial",
  });
  connection.connect();

  connection.query(
    `INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)`,
    [title, description, author_id],
    (err) => {
      if (err) throw err;
      console.log("INSERTED SUCCESSFULLY");
      res.send("Create Success!");
    }
  );
});
```

- POST 방식으로 전달받은 데이터는 `req.body` 에 객체 형태로 저장되어 있습니다.

### Update

글 상세 정보 페이지 아래의 수정 버튼을 클릭 시 글 수정할 수 있는 페이지로 이동합니다. 확인 버튼을 누르면 해당 글의 정보가 수정됩니다.

기존에 있던 `Add.vue` 컴포넌트를 재활용합니다.

```html
<script>
  export default {
    name: "Add",
    props: {
      mode: {
        type: String,
        default: "",
      },
      contentId: {
        type: String,
        default: "-1",
      },
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
    },

    // ... 아래 생략
  };
</script>
```

- `props` 데이터로 모드(신규/수정), 글의 id, 제목, 내용을 받을 수 있도록 업데이트 합니다. 글 상세정보 페이지를 통해 이 컴포넌트로 들어왔을 경우, 데이터베이스에 INSERT 명령이 아닌 UPDATE 명령을 하도록 하기 위함이며 또한 기존의 제목, 내용을 입력란에 그대로 두게 하기 위함입니다.
- 기존처럼 홈 페이지에서 글쓰기 버튼을 통해 컴포넌트에 들어온 경우 글 id의 default 값인 -1 이 서버에 전송되어

```html
<!-- 생략 -->
<div class="input-area title">
  <input v-model="curTitle" type="text" class="title" placeholder="제목" />
</div>
<div class="input-area description">
  <textarea v-model="curDesc" class="description"></textarea>
</div>

<script>
  export default {
    // 생략
    data() {
      return {
        author: "",
        password: "",
        curTitle: this.title,
        curDesc: this.description,
      };
    },
  };
</script>
```

- 입력란과 그대로 양방향 통신을 할 때에 태그에 props 데이터를 사용할 수 없으므로, data 속성에 초기화한 후 사용합니다.

`Read.vue` 컴포넌트를 업데이트 합니다. 수정 버튼을 클릭한 경우 `Add` 컴포넌트로 이동하며 글의 id, 제목, 내용을 함께 전달하며 현재 모드가 수정임을 알리도록 `mode: "modify"` 또한 props 로 전달합니다.

```html
<template>
    <!-- 생략 -->

    <!-- 추가 -->
    <div class="button-area">
      <button @click="modifyHandler">수정</button>
      <button @click="deleteHandler">삭제</button>
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
          name: "Add",
          params: {
            mode: "modify",
            contentId: id,
            title,
            description,
          },
        });
      },
      deleteHandler() {
        console.log("Delete");
      },
    },
  };
</script>
```

백엔드의 `create.js` 를 수정합니다. 전달받은 id 값이 -1 일 경우는 신규 추가, 아닌 경우 수정할 수 있도록 합니다.

```javascript
router.post("/", function (req, res) {
  // 생략 ...
  if (id === "-1") {
    connection.query(
      `INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)`,
      [title, description, author_id],
      (err) => {
        if (err) throw err;
        console.log("INSERTED SUCCESSFULLY");
        res.send("Create Success!");
      }
    );
  } else {
    connection.query(
      `UPDATE topic SET title=?, description=?, author_id=? WHERE id=${id}`,
      [title, description, author_id],
      (err) => {
        if (err) throw err;
        console.log("UPDATED SUCCESSFULLY");
        res.send("Update Success!");
      }
    );
  }
});
```

### Delete

글 상세보기 페이지에서 삭제 버튼을 클릭할 시 데이터베이스에서 데이터를 삭제하도록 구현합니다.

```html
<script>
  export default {
    methods: {
      async deleteHandler() {
        let id = this.$route.params.id;
        await this.$http.post('/api/delete', { id })
        this.$router.push('/')
      }
    }

  }
```

- 글 목록에서 상세보기 페이지로 이동하며 전달받은 글의 id 값을 POST 요청하며 함께 전송합니다.
- 요청이 끝나기를 기다리다가 홈 페이지로 이동하도록 동기화 합니다.

백엔드 파트에서는 간단히 id 값을 받아 해당 글을 삭제하는 기능을 합니다.

```javascript
connection.query(`DELETE FROM topic WHERE id=${id}`, (err) => {
  if (err) throw err;
  res.send("Delete Completed");
});
```

### 레코드 구성 수정

```sql
CREATE TABLE contents (
  id VARCHAR(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT NULL,
  author VARCHAR(30) NOT NULL,
  created DATETIME NOT NULL,
  updated DATETIME NOT NULL,
  PRIMARY KEY(id));

CREATE TABLE comments (
  id VARCHAR(11) NOT NULL,
  author VARCHAR (30) NOT NULL,
  description TEXT NOT NULL,
  created DATETIME NOT NULL,
  updated DATETIME NOT NULL,
  content_id VARCHAR(11) NOT NULL,
  PRIMARY KEY(id));
```

- 기존에 topics와 author가 분리되어 있던 것을 다시 합쳤습니다. 회원 정보에 대한 데이터를 관리하지 않기 때문입니다.
- comments 테이블을 새로 생성하였습니다. content_id 에 대한 정보를 가져 어떤 글에 달린 댓글인지 확인 할 수 있도록 합니다.
