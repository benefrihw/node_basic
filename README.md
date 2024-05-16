< 상품 생성 및 조회, 수정, 삭제 >
  1. 상품 생성
    - name, description, manager, password 입력 시 상품이 생성됩니다.
    - id는 자동생성되고 status는 "FOR_SALE"로 입력됩니다.
    - createdAt, updatedAt이 작성시간 기준으로 입력됩니다.

  2. 상품 목록 조회
    - 현재 등록된 전체 상품 목록을 보여준다.
    - createdAt 기준으로 최근 등록한 상품부터 보여준다.

  3. 상품 상세 조회
    - 상품의 id를 입력해서 조회할 수 있다.

  4. 상품 수정
    - 상품의 id 경로로 들어가서 수정내용 및 비밀번호 입력 후 수정한다.
    - 비밀번호가 틀리면 수정이 불가능하다.

  5. 상품 삭제
    - 상품의 id 경로로 들어가서 비밀번호 입력 후 삭제한다.
    - 비밀번호가 틀리면 삭제가 불가능하다.