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
  ... ex
  id INT(11) NOT NULL AUTO_INCREMENT,

)
```

- NOT NULL : 입력값이 없지 않도록 한다.
- AUTO_INCREMENT : 중복을 방지한다.

DATATYPE 요약
문법 | 내용
-|-
INT | 정수 (약 -20억~20억)
BIGINT | 매우 큰 정수
