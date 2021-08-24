# 아마존 웹 서비스 (AWS)

아마존 웹 서비스에 대한 내용을 정리합니다.

## - EC2

EC2 (Elastic Compute Cloud): 독립된 컴퓨터를 임대해주는 서비스.

아마존에서 가장 먼저 생겼고, 가장 범용성이 넓은 서비스이다.

### - 인스턴스 생성하기

1. 사용할 인스턴스를 선택.

- 그 중에서 Ubuntu 를 사용해본다.

![Create Instance 1]('./markdown/createinstance_1.png')

2. 인스턴스 유형을 선택.

- CPU 1대, 메모리는 1GB 를 사용하는 인스턴스를 사용한다.

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
