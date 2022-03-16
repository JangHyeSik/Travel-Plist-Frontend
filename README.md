# 🌏 Travel Plist

<p align="center"><img width="300" alt="image" src="https://user-images.githubusercontent.com/85345068/158441944-9464e960-392c-44fc-8f7d-1b287b977fc2.gif"></p>

## 목록
- 💡 Motivation
- ✅ Features
- 🌎 Deploy
- 📅 Schedule 
- 🖥 Tech Stack
- 🤔 Why used it
- 😂 아쉬운 점
- 🔥 프로젝트를 마치며..
## 💡 Motivation
제 개인적인 생각으로는 삶을 더 풍요롭게 해주는 기억들이 있다고 생각합니다.

저에게 있어서 그 기억은 여행을 다녀온 후의 기억입니다. 

그 기억을 오래토록 기억하고 간직하고 싶다는 생각에 Travel-Plist 서비스를 기획하게 되었습니다.

## ✅ Features
|                                          |                                          |                                      |
| ---------------------------------------- | ---------------------------------------- | ------------------------------------ |
|<p align="center"><img width="260" src="https://user-images.githubusercontent.com/85345068/158467247-72ee978e-83a2-463d-9726-dc9af74273de.gif"/></p><p align="center">👉 날씨에 따라 배경화면이 바뀝니다.(비, 눈, 구름, 맑음)</p>|<p align="center"><img width="260" src="https://user-images.githubusercontent.com/85345068/158467513-c3dd16a1-d0ff-419b-bf3b-3b4640dcbc47.gif" /></p>👉 여행을 생성할 수 있습니다.|<p><img width="245" src="https://user-images.githubusercontent.com/85345068/158472219-76e6c1ff-a0fd-40e3-8a2a-8222c5457b06.gif" /></p>👉 생성한 여행 내에서 일차별로 여행 세부일정을 작성할 수 있습니다.
|<p><img width="270" src="https://user-images.githubusercontent.com/85345068/158475441-108d376c-a1c7-4f9e-a2e6-1a1289644cd1.gif" /></p>👉 가고 싶은 장소끼리의 경로를 탐색할 수 있습니다.  | <p><img width="280" src="https://user-images.githubusercontent.com/85345068/158474834-3de3997c-e64d-4dd6-932d-80e39f363ffa.gif" /></p>👉 일별로 여행을 기록할 수 있습니다.(사진, 녹음, 일기)

## 🌎 Deploy
### ✈️ [Travel-Plist 배포 사이트](https://www.travelplist.site)
### Frontend
- Netlify
### Backend
- AWS Elastic Beanstalk
Server
## 📅 Schedule
기획 : 2022/02/21 ~ 2022/02/27 (1주간)
  - [Travel Plist mock-up](https://app.moqups.com/lyCYNk5eHUyvF9hC3qq4IMmMZriEmmhN/edit/page/aa9df7b72)
  - [Travel Plist DB schema modeling](https://lucid.app/lucidchart/748c38ef-886c-4265-8ff9-30da3c1308ad/edit?invitationId=inv_ee4b6bf4-1008-48b7-95b1-aa88c842cd7e&page=0_0#)
  - [Task card](https://www.notion.so/b2198058070f4d7ea01e43ea4c1d9ea2?v=f1eccc805a594e86afc879709b205449)
 
개발 및 배포 : 2022/02/28 ~ 2020/03/13 (2주간)
- 기능 구현
- 리팩토링
- 배포
  - [Frontend] Netlify
  - [Backend] AWS Elastic Beanstalk

## 🖥 Tech Stack

### Frontend
- React(Create-react-app)
- React-router-dom
- Redux
- Redux-toolkit
- Redux-saga
- Firebase
- Styled-Component

### Backend
- NodeJS 
- Express
- Mongo db
- Mongoose
- AWS
- JWT

### Convention
- prettier
- eslint

## 🤔 Why used it
### Redux && Redux-toolkit
Travel-Plist의 데이터 구조를 보면 큰 카테고리(여행), 중간 카테고리 (여행 세부일정), 작은 카테고리(여행 세부일정 내에서 세부일정) 으로 중첩된 구조를 이루고 있습니다. 

중첩된 구조인 만큼 여러 상태들이 서로 얽혀있고 연관되어 있습니다. 

로컬로 상태를 관리하게 되면 Prop drilling 심해지게 될 것이고 상태관리에 어려움이 있을 거라는 판단을 했습니다. 그래서 Redux를 적용시켜 전역으로 관리하였습니다.

Redux-Toolkit을 적용시키지 않고 Type, Action, Reducer 파일을 따로 관리하였을 때는 파일을 옮겨다니며 굉장히 불편했던 경험이 있었습니다. Redux-toolkit은 Type, Action, Reducer를 한 데 모아서 관리를 하기 때문에 toolkit을 적용시키지 않았을 때와 비교하면 보일러 플레이트 코드가 확연하게 줄었습니다. 또한 Redux-toolkit은 자체적으로 immer가 내장되어 있어서 객체 불변성 코드를 굳이 작성하지 않아도 되는 점이 인상 깊었습니다. 

### Redux-Saga
현재 클라이언트에서 서버에 비동기 요청을 보내 데이터를 Fetching 하는 코드들이 많습니다. 
컴포넌트 내에서 비동기 요청을 관리한다면 비동기 요청들이 많을수록 Side effect가 많을 것이라고 생각을 했습니다. 
제가 적용시킨 Redux-Saga는 Generator 문법을 사용하여 비동기 작업을 동기적으로 처리할 수 있는 특징이 있습니다. 
또 Saga 함수를 순수함수로 작성해 사용하면 side effect가 적을 것으로 생각했습니다. 
두 번째로는 컴포넌트 내에서 요청들을 관리한다면 오류가 발생 시 디버깅을 하는 것에 어려움이 있다고 생각하였습니다.
Redux-Saga를 적용시켜 비동기 API 요청들을 Saga 함수에 모아 작성하였습니다.
비동기 API 요청들을 Saga 함수에 모아 작성해놓으니 오히려 코드의 흐름을 읽는 것에 용이하였고 또 오류를 찾는 것에 용이하였습니다.

### AWS S3
여행 기록 기능을 구현하기 위해서는 이미지 파일과 오디오 파일을 데이터베이스에 저장해야 했습니다.
이미지 파일과 오디오 파일들이 데이터베이스에 저장되어 있으면 트래픽이 많아질 수록 서버에 과부하가 올 수 있겠구나 라는 생각이 들었습니다. 
그래서 어떻게 하면 크기가 큰 파일들을 효율적으로 저장할 수 있을까라는 고민을 했습니다. 
그렇게 조사하다보니 AWS S3를 접하게 되었습니다.
AWS S3는 매우 저렴한 비용으로 대용량의 데이터를 저장할 수 있으며 SSL을 통한 데이터 전송과 데이터 업로드 후 자동 암호화를 지원하는 것이 굉장히 좋았던 거 같습니다.

## 😂 아쉬운 점
처음 Travel-Plist를 기획했을 때 React-Native를 사용하여 앱으로 제작하려고 했습니다.
하지만 저는 React에 대해서 좀 더 익숙해지고 깊이 있게 공부해보고 싶었습니다.
그렇게 조사를 한 결과 웹사이트가 Native 앱처럼 동작하는 PWA, 프로그레시브 웹 앱을 접하게 되었습니다.
PWA는 웹 어플리케이션이므로 ios, 안드로이드 환경에 상관없이 작동합니다. 
또, 서비스를 설치하여 홈 화면에 바로가기 아이콘을 추가하는 것, 캐싱 데이터를 사용하여 오프라인에서도 열람할 수 있다는 점이 매력적이었습니다.
저는 PWA를 적용시키려고 React-Native를 사용하지 않고
React로 기능 개발을 했지만 기능 구현에 많은 시간을 써서 PWA를 적용시키지 못했습니다.
꼭 PWA를 적용시켜 서비스를 해보고 싶습니다.

## 🔥 프로젝트를 마치며..
프로젝트를 하기 전 내가 할 수 있을까 ? 라는 생각을 많이 했던 거 같습니다. 
프로젝트 이전 공부들을 하며 이렇게만 해서 내가 하나의 서비스를 만들 수 있을까 라는 의문을 많이 품고 지냈었습니다. 하지만 프로젝트를 하면서 저는 이전에 해왔던 공부들, 그 조각들이 하나, 둘씩 맞춰져 
코드를 작성해나가는 저의 모습을 볼 수 있었습니다. 
맞닥뜨린 문제들을 혼자 찾아보고 적용해나가며 하나씩 해결해나가는 것이 정말 뿌듯했습니다.
저에게 이번 프로젝트는 **제가 성장했다는 느낌을 체감할 수 있는 시간**이었습니다. 
정말 뜻깊은 시간이었습니다. 감사합니다.
