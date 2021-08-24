# 아마존 웹 서비스 (AWS)

아마존 웹 서비스에 대한 내용을 정리합니다.

## - EC2

EC2 (Elastic Compute Cloud): 독립된 컴퓨터를 임대해주는 서비스.

아마존에서 가장 먼저 생겼고, 가장 범용성이 넓은 서비스이다.

### - 인스턴스 생성하기

1. 사용할 인스턴스를 선택.

유닉스를 기반으로 하는 LINUX, WINDOW 등이 있다.
아마존에서 제공하는 것은 LINUX 고, 아마존이 직접 수정해서 아마존 서비스에 최적화한 Amazon LINUX 를 제공한다. 기타 Red Hat, SUSE Linux, Ubuntu 도 제공하고 있다. 이들은 1년간 무료이다.

Window Server 2012 가 설치 되어 있는 인스턴스는 1년간 무료. 하지만 나머지 SQL Server 가 설치되어 있는 인스턴스들은 무료가 아니다. SQL은 데이터베이스이고 Microsoft 의 데이터베이스의 가격 정책에 의해 매우 비싸다.

- 그 중에서 Ubuntu 를 사용해본다.

여기서부터 아래의 내용은 어떤 인스턴스를 선택하더라도 비슷하다. 참고하자.

![Create Instance 1]('./markdown/createinstance_1.png')

2. 인스턴스 유형을 선택 (Instane Type).

임대할 컴퓨터의 사양을 선택하는 페이지이다.

| vCPUs                   | Memory      | Instance Storage(GB) | EBS-Optimized Available | Network Performance |
| ----------------------- | ----------- | -------------------- | ----------------------- | ------------------- |
| CPU의 개수 (v: virtual) | 메모리 용량 | -                    | -                       | 네트워크의 성능     |

Type에 m 으로 시작하는 것은 Memory에 우위가 있고 <br />
c 로 시작하는 것은 CPU에 우위가 있고 <br />
g 로 시작하는 것은 GPU에 우위가 있다.

환경에 알맞는 유형을 선택하도록 한다.

- CPU 1대, 메모리는 1GB 를 사용하는 인스턴스(Free tier)를 사용한다.

![Create Instance 2]('./markdown/createinstance_2.png')

3. 인스턴스 세부 정보 구성

- 컴퓨터를 1대만 생성하겠다는 '인스턴스 개수'에 1를 입력해둔다.

![Create Instance 2]('./markdown/createinstance_3.png')

4. 스토리지 추가

- SSD 8GB 를 사용한다.

5. 태그 추가

- 컴퓨터의 이름을 지정한다.
  - 태그를 추가 - Key에 Name, Value에 이름(현재는 Web Server) 를 지정한다.

6. 보안 관련 설정

- 보안 그룹 이름에 Web server 를 쓴다
- HTTP 를 규칙에 추가한다.

![Create Instance 2]('./markdown/createinstance_4.png')

7. Create a new key pair

- Create a new key pair 를 선택한다
- 키 페어 이름에 awspwd 를 입력하고 다운을 받는다.
