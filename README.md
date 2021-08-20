# 게시판 만들기

Vue.js 와 데이터베이스 (MySQL)의 학습을 주 목적으로 진행하는 프로젝트 입니다.

문서는 공부한 내용을 정리하는 방식으로 작성합니다.

<br />

## 데이터베이스

데이터베이스의 핵심

- 어떻게 입력할 것인가?
- 어떻게 출력할 것인가?

입력을 어떻게 할 것인가?

- Create
- Update
- Delete

출력을 어떻게 할 것인가?

- Read

그 어떤 데이터베이스를 만나더라도 CRUD (Create, Read, Update, Delete) 가 가장 중요하다.

<br />

## MySQL 설치

Window 설치법

- 쉽게 MySQL, Apache 등을 한 번에 설치해주는 Bitnami 를 받아 설치하도록 하자.
- [설치 페이지](https://bitnami.com/stack/wamp/installer)

MacOS 설치법

[생활코딩](https://opentutorials.org/course/3161/19532) <- 강의 참고!

설치가 완료되면 `cmd` 창을 연 후 mysql.exe 가 설치되어 있는 경로로 이동한 후에 아래와 같이 실행한다.

```bash
$ cd C:\Bitnami\wampstack-8.0.9-0\mariadb\bin
$ mysql -uroot -p

Enter password: ********
```

<br />

## MySQL의 구조

(그림 파트)

| 데이터베이스         | 파일 |
| -------------------- | ---- |
| 표 (table)           | 파일 |
| 데이터베이스(schema) | 폴더 |

데이터베이스는 스키마라는 표들을 하나로 Grouping 하는 말로 쓰이기도 한다.

<br />

## 데이터베이스(schema)의 생성, 삭제, 확인

- 데이터베이스 생성

```
CREATE DATABASE database-name;
```

- 데이터베이스 삭제

```
DROP DATABASE database-name;
```

- 데이터베이스 목록 확인

```
SHOW DATABASES;
```

특정 데이터베이스를 사용하기 위해서는 해당 데이터베이스를 사용하겠다는 명령을 내려주어야 한다.

```
USE database-name;
```

<br />

## SQL

Structured <br />
Query<br />
Language<br />

관계형 데이터베이스라는 카테고리에 속하는 제품들이 공통적으로 데이터베이스 서버를 제어할 때 사용하는 언어.

<br />

## 표 (table)

| id  | title  | description  | created  |
| --- | ------ | ------------ | -------- |
| 1   | MYSQL  | MySQL is...  | 2018-1-1 |
| 2   | Oracle | Oracle is... | 2018-1-3 |

위와 같은 형태를 표, table 이라고 한다.<br />
수평 - 행, row, record<br />
수직 - 열, column

### 표 생성

```SQL
CREATE TABLE topic(
  c1 Datatype(LENGTH),
  c2 Datatype(LENGTH),
  ...
);

CREATE TABLE topic(
    -> id INT(11) NOT NULL AUTO_INCREMENT,
    -> title VARCHAR(100) NOT NULL,
    -> description TEXT NULL,
    -> created DATETIME NOT NULL,
    -> author VARCHAR(30) NULL,
    -> profile VARCHAR(100) NULL,
    -> PRIMARY KEY(id));
```

- NOT NULL : 입력값이 없지 않도록 한다.
- AUTO_INCREMENT : 중복을 방지한다.
- PRIMARY KEY : 기본키를 설정한다.

DATATYPE 요약
문법 | 내용
-|-
INT | 정수 (약 -20억~20억)
BIGINT | 매우 큰 정수

<br />

## 표의 CRUD

### 생성(CREATE) - INSERT

```sql
INSERT INTO topic (title, description, created, author, profile) values('MySQL', 'MySQL is ...', NOW(), 'moonsdog', 'developer');
```

- `INSERT INTO 테이블이름 (속성1, 속성2 ...) VALUES (값1, 값2 ...);`
- `NOW()` : 현재 시간을 알려주는 함수

- topic 테이블의 구조를 확인하기 위해서는 `DESC` 키워드를 사용한다.

```sql
DESC topic;
```

<br />

### 읽기 (READ) - SELECT <br />

가장 많이 사용하게 될 키워드이며 사용 방법이 무궁무진하므로 가장 집중해야 한다.

`SELECT (속성1, 속성2...) FROM (테이블이름) WHERE (조건)`

```sql
SELECT * FROM topic;
```

- 위 문장은 topic 테이블 안에 있는 모든 데이터를 확인.
- 함부로 사용하지 않도록 하자. 너무 많은 데이터를 사용하게 되어 컴퓨터가 다운되기 쉬움.
- 전체 데이터 중 일부만 보고 싶다면 LIMIT 을 써보자.
  - `SELECT * FROM topic LIMIT 2` - 전체 데이터 중 2개만 확인

```sql
SELECT id, title, created, author FROM topic WHERE author='egoing';

+----+---------+---------------------+--------+
| id | title   | created             | author |
+----+---------+---------------------+--------+
|  2 | Oracle  | 2021-08-20 08:33:04 | egoing |
|  5 | MongoDB | 2021-08-20 08:35:49 | egoing |
+----+---------+---------------------+--------+
```

- author 가 'egoing' 인 레코드를 id, title, created, author 로 출력

```sql
SELECT id, title, created, author FROM topic WHERE author='egoing' ORDER BY id DESC;


```

- ORDER BY (속성) (DESC | ASC) : 속성을 기준으로 오름차순(내림차순) 으로 정렬

<br />

### 수정(UPDATE) - UPDATE

`UPDATE (테이블이름) SET ('변경할 속성' = '내용'), ... WHERE (조건);`

```sql
UPDATE topic SET description='Oracle is ...', title='Oracle' WHERE id=2;
```

- WHERE 문을 빠트리면 재앙이 닥치므로 주의하자.

<br />

### 삭제(DELETE) - DELETE

`DELETE FROM (테이블이름) WHERE (조건)`

```sql
DELETE FROM topic WHERE id=5;
```

- 마찬가지로 WHERE 문을 빠트린다거나 하는 실수를 하면 재앙이 닥치므로 주의하자.
