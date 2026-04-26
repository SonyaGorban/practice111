practice1
PS C:\Users\user\Desktop\practice11> docker --version Docker version 29.2.1, build a5c7197 PS C:\Users\user\Desktop\practice11> docker compose version Docker Compose version v5.0.2 PS C:\Users\user\Desktop\practice11> docker run --rm hello-world

Hello from Docker! This message shows that your installation appears to be working correctly.

Student
Name: Софія Горбань
Group: <232/1>
3
docker compose up --build

✔ Image practice111-npm Built 1.3s ✔ Container practice111-npm-1 Recreated 0.2s Attaching to npm-1 npm-1 | 11.11.0 npm-1 exited with code 0

PS C:\Users\user\Desktop\practice11\practice111> docker compose run --rm npm npm -v Container practice111-npm-run-75ab37c7d19e Creating Container practice111-npm-run-75ab37c7d19e Created 11.11.0 PS C:\Users\user\Desktop\practice11\practice111> docker compose run --rm npm node --version Container practice111-npm-run-688177eb60b8 Creating Container practice111-npm-run-688177eb60b8 Created v25.8.0 PS C:\Users\user\Desktop\practice11\practice111>

### practice2  Практичне заняття №2 — NestJS + PostgreSQL + Redis
Student
Name: Софія Горбань
Group: <232/1>

## Опис
Проєкт демонструє налаштоване середовище розробки на базі:

- NestJS (backend)
- PostgreSQL (база даних)
- Redis (кешування)
- Docker + Docker Compose

---

## Структура репозиторію
src/ # NestJS source code
├── Dockerfile
├── docker-compose.yml
├── .env
├── .env.example
└── README.md

## Запуск проекту
cp .env.example .env
docker compose up --build
## Перевірка сервісів
ВПРАВА 1
docker compose run --rm app npm -v
[+]  2/2t 2/22
 ✔ Container practice111-redis-1    Running                                                                                                                0.0s
 ✔ Container practice111-postgres-1 Running                                                                                                                0.0s
Container practice111-postgres-1 Waiting 
Container practice111-redis-1 Waiting 
Container practice111-redis-1 Healthy 
Container practice111-postgres-1 Healthy 
Container practice111-app-run-6b37152f4b15 Creating 
Container practice111-app-run-6b37152f4b15 Created 
10.8.2



PS C:\Users\user\Desktop\practice11\practice111> docker compose run --rm app node --version
[+]  2/2t 2/22
 ✔ Container practice111-redis-1    Running                                                                                 0.0s
 ✔ Container practice111-postgres-1 Running                                                                                 0.0s
Container practice111-postgres-1 Waiting 
Container practice111-redis-1 Waiting 
Container practice111-redis-1 Healthy 
Container practice111-postgres-1 Healthy 
Container practice111-app-run-3a7157b03e1c Creating 
Container practice111-app-run-3a7157b03e1c Created 
v20.20.2  

C:\Users\user\Desktop\practice11\practice111> docker compose run --rm app nest --version
[+]  2/2t 2/22
 ✔ Container practice111-redis-1    Running                                                                                 0.0s
 ✔ Container practice111-postgres-1 Running                                                                                 0.0s
Container practice111-postgres-1 Waiting 
Container practice111-redis-1 Waiting 
Container practice111-redis-1 Healthy 
Container practice111-postgres-1 Healthy 
Container practice111-app-run-afbd4dad566f Creating 
Container practice111-app-run-afbd4dad566f Created 
11.0.21 

ВПРАВА 2
PS C:\Users\user\Desktop\practice11\practice111> docker compose ps
NAME                     IMAGE                COMMAND                  SERVICE    CREATED          STATUS                    PORTS
practice111-app-1        practice111-app      "docker-entrypoint.s…"   app        39 minutes ago   Up 6 minutes              0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp
practice111-postgres-1   postgres:16-alpine   "docker-entrypoint.s…"   postgres   45 minutes ago   Up 39 minutes (healthy)   0.0.0.0:5433->5432/tcp, [::]:5433->5432/tcp
practice111-redis-1      redis:7-alpine       "docker-entrypoint.s…"   redis      45 minutes ago   Up 39 minutes (healthy)   0.0.0.0:6380->6379/tcp, [::]:6380->6379/tcp



ВПРАВА 3

C:\Users\user\Desktop\practice11\practice111> curl http://localhost:3000 -UseBasicParsing
StatusCode        : 200
StatusDescription : OK
Content           : Hello World!
RawContent        : HTTP/1.1 200 OK
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length: 12
                    Content-Type: text/html; charset=utf-8
                    Date: Sat, 04 Apr 2026 17:14:21 GMT
                    ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"...

ВПРАВА 4
[6:42:07 PM] Starting compilation in watch mode...
app-1  | 
app-1  | [6:42:10 PM] Found 0 errors. Watching for file changes.
app-1  | 
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [NestFactory] Starting Nest application...
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +90ms
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +0ms
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [InstanceLoader] CacheModule dependencies initialized +38ms
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +69ms
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [RoutesResolver] AppController {/}: +4ms
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [RouterExplorer] Mapped {/, GET} route +4ms
app-1  | [Nest] 34  - 04/26/2026, 6:42:12 PM     LOG [NestApplication] Nest application successfully started +5ms
postgres-1  | 2026-04-26 18:45:44.321 UTC [55] LOG:  checkpoint starting: time
postgres-1  | 2026-04-26 18:45:48.559 UTC [55] LOG:  checkpoint complete: wrote 45 buffers (0.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=4.217 s, sync=0.011 s, total=4.240 s; sync files=12, longest=0.006 s, average=0.001 s; distance=260 kB, estimate=260 kB; lsn=0/195FC10, redo lsn=0/195FBD8


Використані технології
NestJS
TypeORM
PostgreSQL
Redis
Docker / Docker Compose
Node.js


ВПРАВА 5 
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      }),
    }),
  ],
})


ВПРАВА 6
 PS C:\Users\user\Desktop\practice11\practice111> docker compose exec postgres psql -U nestuser -d nestdb -c '\l'
                                                      List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges   
-----------+----------+----------+-----------------+------------+------------+------------+-----------+-----------------------
 nestdb    | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
 postgres  | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
 template0 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
 template1 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
(4 rows)

C:\Users\user\Desktop\practice11\practice111> docker compose exec redis redis-cli ping
PONG