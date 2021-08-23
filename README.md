# 게시판 만들기

Vue.js 와 데이터베이스(MySQL), 클라우드 서버(AWS) 학습을 주 목적으로 진행하는 프로젝트 입니다.

문서는 공부한 내용을 정리하는 방식으로 작성합니다.

일별 개발 일지는 [./record]() 에 저장합니다.
<br />

## 8월 23일 목표

- 로컬 서버에서 아래 기능들을 모두 구현하는 것이 목적입니다.

1. 게시판 글 생성, 읽기, 수정, 삭제
2. 댓글 생성, 읽기, 수정, 삭제

### 미완료

- 댓글 수정

### 버그

- 글 상세보기 페이지에서 새로고침 시 빈 페이지가 출력됨

### 기록

#### axios 모듈을 이용한 get, post 요청

8월 20일에 `get` 요청으로 글 목록을 받아오는 것을 구현했었습니다.

- Frontend 에서의 요청

```html
<script>
  export default {
    data() {
      return {
        contents: [],
      };
    },
    created() {
      this.$http.get("/api/home").then((response) => {
        this.contents = response.data;
      });
    },
  };
</script>
```

- Backend 에서의 처리 및 응답

```javascript
// require part ...

router.get("/", (req, res) => {
  // mysql.connection ...

  connection.query("SELECT * FROM contents", (err, contents) => {
    if (err) throw err;
    res.send(contents);
  });
});
```

금일은 추가로 post 방식을 사용해 보았습니다. <br />
POST 통신 방식은 query url 에 노출되어선 안되는 정보가 있거나, 전송할 데이터가 아주 큰 경우 사용할 수 있습니다. <br />
글의 생성, 수정의 경우 글 본문의 내용이 많은 문자열을 포함하므로 POST 방식으로 통신하도록 하였습니다.

<br />

Frontend 에서 POST 방식으로 요청을 보냅니다.

```html
<script>
  export default {
    methods: {
      create() {
        this.$http
          .post("/api/create", {
            title: this.title,
            description: this.description,
          })
          .then((response) => {
            console.log(response.data);
          });
      },
    },
  };
</script>
```

- `this.$http.post(URL, {object})` : url에 요청을 보내며 객체를 함께 보냅니다.
- 요청을 받은 서버는 `req.body` 와 같은 방식으로 전달받은 객체를 사용할 수 있습니다.

Backend 에서 아래와 같이 요청을 처리 및 응답합니다.

```javascript
// require part ...

router.post("/", function (req, res) {
  let title = req.body.title;
  let description = req.body.description;

  // connection ...
  connection.query(
    "INSERT INTO contents (title, description) VALUES (?, ?)",
    [title, description],
    (err) => {
      if (err) throw err;
      res.send("Insert Completed");
    }
  );
});
```

위와 같이 각 기능에 필요한 통신 방식을 채택하여 기능들을 구현하였습니다.
