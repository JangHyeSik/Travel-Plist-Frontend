# 🌏 Travel Plist

<p align="center"><img width="300" alt="image" src="https://user-images.githubusercontent.com/85345068/158441944-9464e960-392c-44fc-8f7d-1b287b977fc2.gif"></p>

## 목록
💡 Motivation
✅ Features
📅 Schedule
🖥 Tech Stack
🤔 Why used it
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
### Redux-Saga && Redux-toolkit
