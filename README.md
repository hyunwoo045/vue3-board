# 게시판 만들기

Vue.js 와 데이터베이스 (MySQL)의 학습을 주 목적으로 진행하는 프로젝트 입니다.

문서는 공부한 내용을 정리하는 방식으로 작성합니다.

<br />

## 데이터베이스

<br />

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

## MySQL의 구조
