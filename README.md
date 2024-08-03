# 리액트 비디오 플레이어

리액트 기반의 비디오 플레이어로, 플레이리스트 관리, 즐겨찾기, 드래그 앤 드롭 지원 및 테마 전환 기능을 제공합니다.

## 주요 기능

- 유튜브 동영상을 플레이리스트에 추가
- 동영상 재생, 일시정지 및 탐색
- 반복 및 셔플 재생
- 전체 화면 지원
- 볼륨 조절
- 드래그 앤 드롭으로 플레이리스트 관리
- 즐겨찾기 동영상 관리
- 라이트/다크 테마 전환
- 키보드 단축키 지원

## 설치 방법

1. 리포지토리를 클론합니다:

    ```sh
    git clone https://github.com/your-username/react-video-player.git
    cd react-video-player
    ```

2. 종속성을 설치합니다:

    ```sh
    npm install
    ```

## 사용 방법

1. 개발 서버를 시작합니다:

    ```sh
    npm start
    ```

2. 브라우저를 열고 `http://localhost:3000`에 접속합니다.

## 키보드 단축키

- `Space`: 재생/일시정지
- `ArrowRight`: 다음 동영상
- `ArrowLeft`: 이전 동영상
- `ArrowUp`: 볼륨 증가
- `ArrowDown`: 볼륨 감소

## 프로젝트 구조

- `src`
    - `App.tsx`: 메인 컴포넌트 파일
    - `styles.ts`: styled-components 스타일
    - `theme.ts`: 테마 정의

## 커스터마이징

### 테마 전환

UI에서 제공하는 테마 전환 버튼을 사용하여 라이트 및 다크 테마 간 전환이 가능합니다.

### 동영상 추가

플레이리스트에 동영상을 추가하려면:
1. 입력 필드에 유튜브 URL을 입력합니다.
2. "Add Video" 버튼을 클릭합니다.

### 플레이리스트 관리

드래그 앤 드롭 기능을 사용하여 플레이리스트의 순서를 변경할 수 있습니다.

### 즐겨찾기

플레이리스트의 각 동영상 옆에 있는 별 버튼을 클릭하여 즐겨찾기 목록에 추가할 수 있습니다.

## 기여 방법

1. 리포지토리를 포크합니다.
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/your-feature-name`).
3. 변경 사항을 커밋합니다 (`git commit -am 'Add some feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/your-feature-name`).
5. 새로운 풀 리퀘스트를 생성합니다.

## 라이센스

이 프로젝트는 MIT 라이센스로 라이센스가 부여되어 있습니다.
