# π Travel Plist

<p align="center"><img width="300" alt="image" src="https://user-images.githubusercontent.com/85345068/158441944-9464e960-392c-44fc-8f7d-1b287b977fc2.gif"></p>

## λͺ©λ‘
- π‘ Motivation
- β Features
- π Deploy
- π Schedule 
- π₯ Tech Stack
- π€ Why used it
- π μμ¬μ΄ μ 
- π₯ νλ‘μ νΈλ₯Ό λ§μΉλ©°..
## π‘ Motivation
μ  κ°μΈμ μΈ μκ°μΌλ‘λ μΆμ λ νμλ‘­κ² ν΄μ£Όλ κΈ°μ΅λ€μ΄ μλ€κ³  μκ°ν©λλ€.

μ μκ² μμ΄μ κ·Έ κΈ°μ΅μ μ¬νμ λ€λμ¨ νμ κΈ°μ΅μλλ€. 

κ·Έ κΈ°μ΅μ μ€λν λ‘ κΈ°μ΅νκ³  κ°μ§νκ³  μΆλ€λ μκ°μ Travel-Plist μλΉμ€λ₯Ό κΈ°ννκ² λμμ΅λλ€.

## β Features
|                                          |                                          |                                      |
| ---------------------------------------- | ---------------------------------------- | ------------------------------------ |
|<p align="center"><img width="260" height="480" src="https://user-images.githubusercontent.com/85345068/158467247-72ee978e-83a2-463d-9726-dc9af74273de.gif"/></p><p align="center">π λ μ¨μ λ°λΌ λ°°κ²½νλ©΄μ΄ λ°λλλ€.</p>|<p align="center"><img width="260" height="480" src="https://user-images.githubusercontent.com/85345068/158467513-c3dd16a1-d0ff-419b-bf3b-3b4640dcbc47.gif" /></p><p align="center">π μ¬νμ μμ±ν  μ μμ΅λλ€.</p>|<p align="center"><img width="260" height="460" src="https://user-images.githubusercontent.com/85345068/158472219-76e6c1ff-a0fd-40e3-8a2a-8222c5457b06.gif" /></p><p align="center">π μμ±ν μ¬ν λ΄μμ μΌμ°¨λ³λ‘ μ¬ν μΈλΆμΌμ μ μμ±ν  μ μμ΅λλ€.</p>
|<p align="center"><img width="260" height="480" src="https://user-images.githubusercontent.com/85345068/158475441-108d376c-a1c7-4f9e-a2e6-1a1289644cd1.gif" /></p><p align="center">π κ°κ³  μΆμ μ₯μλΌλ¦¬μ κ²½λ‘λ₯Ό νμν  μ μμ΅λλ€.</p>  | <p align="center"><img width="260" height="480" src="https://user-images.githubusercontent.com/85345068/158474834-3de3997c-e64d-4dd6-932d-80e39f363ffa.gif" /></p><p align="center">π μΌλ³λ‘ μ¬νμ κΈ°λ‘ν  μ μμ΅λλ€.(μ¬μ§, λΉμ, μΌκΈ°)</p> |

## π Deploy
### βοΈ [Travel-Plist λ°°ν¬ μ¬μ΄νΈ](https://www.travelplist.site)
### Frontend
- Netlify
### Backend
- AWS Elastic Beanstalk
Server
## π Schedule
κΈ°ν : 2022/02/21 ~ 2022/02/27 (1μ£Όκ°)
  - [Travel Plist mock-up](https://app.moqups.com/lyCYNk5eHUyvF9hC3qq4IMmMZriEmmhN/edit/page/aa9df7b72)
  - [Travel Plist DB schema modeling](https://lucid.app/lucidchart/748c38ef-886c-4265-8ff9-30da3c1308ad/edit?invitationId=inv_ee4b6bf4-1008-48b7-95b1-aa88c842cd7e&page=0_0#)
  - [Task card](https://www.notion.so/b2198058070f4d7ea01e43ea4c1d9ea2?v=f1eccc805a594e86afc879709b205449)
 
κ°λ° λ° λ°°ν¬ : 2022/02/28 ~ 2020/03/13 (2μ£Όκ°)
- κΈ°λ₯ κ΅¬ν
- λ¦¬ν©ν λ§
- λ°°ν¬
  - [Frontend] Netlify
  - [Backend] AWS Elastic Beanstalk

## π₯ Tech Stack

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

## π€ Why used it
### Redux && Redux-toolkit
Travel-Plistμ λ°μ΄ν° κ΅¬μ‘°λ₯Ό λ³΄λ©΄ ν° μΉ΄νκ³ λ¦¬(μ¬ν), μ€κ° μΉ΄νκ³ λ¦¬ (μ¬ν μΈλΆμΌμ ), μμ μΉ΄νκ³ λ¦¬(μ¬ν μΈλΆμΌμ  λ΄μμ μΈλΆμΌμ ) μΌλ‘ μ€μ²©λ κ΅¬μ‘°λ₯Ό μ΄λ£¨κ³  μμ΅λλ€. 
μ€μ²©λ κ΅¬μ‘°μΈ λ§νΌ μ¬λ¬ μνλ€μ΄ μλ‘ μ½νμκ³  μ°κ΄λμ΄ μμ΅λλ€. 
λ‘μ»¬λ‘ μνλ₯Ό κ΄λ¦¬νκ² λλ©΄ Prop drilling μ¬ν΄μ§κ² λ  κ²μ΄κ³  μνκ΄λ¦¬μ μ΄λ €μμ΄ μμ κ±°λΌλ νλ¨μ νμ΅λλ€. κ·Έλμ Reduxλ₯Ό μ μ©μμΌ μ μ­μΌλ‘ κ΄λ¦¬νμμ΅λλ€. 
Redux-Toolkitμ μ μ©μν€μ§ μκ³  Type, Action, Reducer νμΌμ λ°λ‘ κ΄λ¦¬νμμ λλ νμΌμ μ?κ²¨λ€λλ©° κ΅μ₯ν λΆνΈνλ κ²½νμ΄ μμμ΅λλ€. 
Redux-toolkitμ Type, Action, Reducerλ₯Ό ν λ° λͺ¨μμ κ΄λ¦¬λ₯Ό νκΈ° λλ¬Έμ toolkitμ μ μ©μν€μ§ μμμ λμ λΉκ΅νλ©΄ λ³΄μΌλ¬ νλ μ΄νΈ μ½λκ° νμ°νκ² μ€μμ΅λλ€. 
λν Redux-toolkitμ μμ²΄μ μΌλ‘ immerκ° λ΄μ₯λμ΄ μμ΄μ κ°μ²΄ λΆλ³μ± μ½λλ₯Ό κ΅³μ΄ μμ±νμ§ μμλ λλ μ μ΄ μΈμ κΉμμ΅λλ€. 

### Redux-Saga
ν΄λΌμ΄μΈνΈμμ μλ²μ API λΉλκΈ° μμ²­μ λ³΄λ΄ λ°μ΄ν°λ₯Ό Fetching νλ μ½λλ€μ΄ λ§μ΅λλ€. 
μ»΄ν¬λνΈ λ΄μμ λΉλκΈ° μμ²­μ κ΄λ¦¬νλ€λ©΄ μ²« λ²μ§Έλ‘ λΉλκΈ° μμ²­λ€μ΄ λ§μμλ‘ Side effectκ° λ§μ κ²μ΄λΌκ³  νλ¨νμ΅λλ€.
μ κ° μ μ©μν¨ Redux-Sagaλ Generator λ¬Έλ²μ μ¬μ©νμ¬ λΉλκΈ° μμμ λκΈ°μ μΌλ‘ μ²λ¦¬ν  μ μλ νΉμ§μ΄ μμ΅λλ€. 
λ Saga ν¨μλ₯Ό μμν¨μλ‘ μμ±ν΄ μ¬μ©νλ©΄ side effectκ° μ μ κ²μΌλ‘ μκ°νμ΅λλ€.
λ λ²μ§Έλ‘λ λΉλκΈ° μμ²­ λ΄μμ μ€λ₯κ° λ°μ μ λλ²κΉμ νλ κ²μ μ΄λ €μμ΄ μλ€κ³  μκ°νμμ΅λλ€.
μ»΄ν¬λνΈ λ΄μμ μμ²­λ€μ κ΄λ¦¬νλ€λ©΄ μ€λ₯κ° λ°μ μ λλ²κΉμ νλ κ²μ μ΄λ €μμ΄ μλ€κ³  μκ°νμμ΅λλ€.
Redux-Sagaλ₯Ό μ μ©μμΌ λΉλκΈ° API μμ²­λ€μ Saga ν¨μμ λͺ¨μ μμ±νμμ΅λλ€.
λΉλκΈ° API μμ²­λ€μ Saga ν¨μμ λͺ¨μ μμ±ν΄λμΌλ μ€νλ € μ½λμ νλ¦μ μ½λ κ²μ μ©μ΄νμκ³  λ μ€λ₯λ₯Ό μ°Ύλ κ²μ μ©μ΄νμμ΅λλ€.

### AWS S3
μ¬ν κΈ°λ‘ κΈ°λ₯μ κ΅¬ννκΈ° μν΄μλ μ΄λ―Έμ§ νμΌκ³Ό μ€λμ€ νμΌμ λ°μ΄ν°λ² μ΄μ€μ μ μ₯ν΄μΌ νμ΅λλ€.
μ΄λ―Έμ§ νμΌκ³Ό μ€λμ€ νμΌλ€μ΄ λ°μ΄ν°λ² μ΄μ€μ μ μ₯λμ΄ μμΌλ©΄ νΈλν½μ΄ λ§μμ§ μλ‘ μλ²μ κ³ΌλΆνκ° μ¬ μ μκ² κ΅¬λ λΌλ μκ°μ΄ λ€μμ΅λλ€. 
κ·Έλμ μ΄λ»κ² νλ©΄ ν¬κΈ°κ° ν° νμΌλ€μ ν¨μ¨μ μΌλ‘ μ μ₯ν  μ μμκΉλΌλ κ³ λ―Όμ νμ΅λλ€. 
κ·Έλ κ² μ‘°μ¬νλ€λ³΄λ AWS S3λ₯Ό μ νκ² λμμ΅λλ€.
AWS S3λ λ§€μ° μ λ ΄ν λΉμ©μΌλ‘ λμ©λμ λ°μ΄ν°λ₯Ό μ μ₯ν  μ μμΌλ©° SSLμ ν΅ν λ°μ΄ν° μ μ‘κ³Ό λ°μ΄ν° μλ‘λ ν μλ μνΈνλ₯Ό μ§μνλ κ²μ΄ κ΅μ₯ν μ’μλ κ±° κ°μ΅λλ€.

## π μμ¬μ΄ μ 
μ²μ Travel-Plistλ₯Ό κΈ°ννμ λ React-Nativeλ₯Ό μ¬μ©νμ¬ μ±μΌλ‘ μ μνλ €κ³  νμ΅λλ€.
νμ§λ§ μ λ Reactμ λν΄μ μ’ λ μ΅μν΄μ§κ³  κΉμ΄ μκ² κ³΅λΆν΄λ³΄κ³  μΆμμ΅λλ€.
κ·Έλ κ² μ‘°μ¬λ₯Ό ν κ²°κ³Ό μΉμ¬μ΄νΈκ° Native μ±μ²λΌ λμνλ PWA, νλ‘κ·Έλ μλΈ μΉ μ±μ μ νκ² λμμ΅λλ€.
PWAλ μΉ μ΄νλ¦¬μΌμ΄μμ΄λ―λ‘ ios, μλλ‘μ΄λ νκ²½μ μκ΄μμ΄ μλν©λλ€. 
λ, μλΉμ€λ₯Ό μ€μΉνμ¬ ν νλ©΄μ λ°λ‘κ°κΈ° μμ΄μ½μ μΆκ°νλ κ², μΊμ± λ°μ΄ν°λ₯Ό μ¬μ©νμ¬ μ€νλΌμΈμμλ μ΄λν  μ μλ€λ μ μ΄ λ§€λ ₯μ μ΄μμ΅λλ€.
μ λ PWAλ₯Ό μ μ©μν€λ €κ³  React-Nativeλ₯Ό μ¬μ©νμ§ μκ³  Reactλ‘ κΈ°λ₯ κ°λ°μ νμ§λ§ κΈ°λ₯ κ΅¬νμ λ§μ μκ°μ μ¨μ PWAλ₯Ό μ μ©μν€μ§ λͺ»νμ΅λλ€.
κΌ­ PWAλ₯Ό μ μ©μμΌ μλΉμ€λ₯Ό ν΄λ³΄κ³  μΆμ΅λλ€.

## π₯ νλ‘μ νΈλ₯Ό λ§μΉλ©°..
νλ‘μ νΈλ₯Ό νκΈ° μ  λ΄κ° ν  μ μμκΉ ? λΌλ μκ°μ λ§μ΄ νλ κ±° κ°μ΅λλ€. 
νλ‘μ νΈ μ΄μ  κ³΅λΆλ€μ νλ©° μ΄λ κ²λ§ ν΄μ λ΄κ° νλμ μλΉμ€λ₯Ό λ§λ€ μ μμκΉ λΌλ μλ¬Έμ λ§μ΄ νκ³  μ§λμμ΅λλ€. 
νμ§λ§ νλ‘μ νΈλ₯Ό νλ©΄μ μ λ μ΄μ μ ν΄μλ κ³΅λΆλ€, κ·Έ μ‘°κ°λ€μ΄ νλ, λμ© λ§μΆ°μ Έ μ½λλ₯Ό μμ±ν΄λκ°λ μ μ λͺ¨μ΅μ λ³Ό μ μμμ΅λλ€. 
λ§λ₯λ¨λ¦° λ¬Έμ λ€μ νΌμ μ°Ύμλ³΄κ³  μ μ©ν΄λκ°λ©° νλμ© ν΄κ²°ν΄λκ°λ κ²μ΄ μ λ§ λΏλ―νμ΅λλ€.
μ μκ² μ΄λ² νλ‘μ νΈλ **μ κ° μ±μ₯νλ€λ λλμ μ²΄κ°ν  μ μλ μκ°**μ΄μμ΅λλ€. 
μ λ§ λ»κΉμ μκ°μ΄μμ΅λλ€. κ°μ¬ν©λλ€.
