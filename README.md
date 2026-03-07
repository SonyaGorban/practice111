# practice111


PS C:\Users\user\Desktop\practice11> docker --version
Docker version 29.2.1, build a5c7197
PS C:\Users\user\Desktop\practice11> docker compose version
Docker Compose version v5.0.2
PS C:\Users\user\Desktop\practice11> docker run --rm hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.


## Student
- Name: Софія Горбань
- Group: <232/1>


## 3
docker compose up --build



 ✔ Image practice111-npm       Built                                       1.3s
 ✔ Container practice111-npm-1 Recreated                                   0.2s
Attaching to npm-1
npm-1  | 11.11.0
npm-1 exited with code 0


PS C:\Users\user\Desktop\practice11\practice111> docker compose run --rm npm npm -v
Container practice111-npm-run-75ab37c7d19e Creating 
Container practice111-npm-run-75ab37c7d19e Created 
11.11.0
PS C:\Users\user\Desktop\practice11\practice111> docker compose run --rm npm node --version
Container practice111-npm-run-688177eb60b8 Creating 
Container practice111-npm-run-688177eb60b8 Created 
v25.8.0
PS C:\Users\user\Desktop\practice11\practice111> 


