## practice1
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


## Практична 3 — CRUD REST API для MiniShop

Student
Name: Горбань Софія Сергіївна
Group: 232.1

Структура репозиторію
. ├── src/ │ ├── categories/ │ │ ├── category.entity.ts │ │ ├── categories.module.ts │ │ ├── categories.service.ts │ │ └── categories.controller.ts │ ├── products/ │ │ ├── product.entity.ts │ │ ├── products.module.ts │ │ ├── products.service.ts │ │ └── products.controller.ts │ ├── migrations/ │ │ ├── 1700000001-CreateTables.ts │ │ └── -AddIsActiveToProducts.ts │ ├── data-source.ts │ └── app.module.ts ├── Dockerfile ├── docker-compose.yml └── README.md

Запуск проекту
cp .env.example .env docker compose up --build

 PS C:\Users\user\Desktop\practice11\practice111> docker compose up --build -d
#1 [internal] load local bake definitions
#1 reading from stdin 547B 0.0s done
#1 DONE 0.0s

#2 [internal] load build definition from Dockerfile
#2 transferring dockerfile: 251B 0.0s done
#2 DONE 0.0s

#3 [auth] library/node:pull token for registry-1.docker.io
#3 DONE 0.0s

#4 [internal] load metadata for docker.io/library/node:20-alpine
#4 DONE 2.2s

#5 [internal] load .dockerignore
#5 transferring context: 2B done
#5 DONE 0.0s

#6 [1/6] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
#6 resolve docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293 0.0s done
#6 DONE 0.0s

#7 [internal] load build context
#7 transferring context: 3.24MB 2.0s done
#7 DONE 2.1s

#8 [2/6] RUN npm install -g @nestjs/cli
#8 CACHED

#9 [3/6] WORKDIR /app
#9 CACHED

#10 [4/6] COPY package*.json ./
#10 CACHED

#11 [5/6] RUN npm install --ignore-scripts 2>/dev/null || true
#11 CACHED

#12 [6/6] COPY . .
#12 DONE 5.5s

#13 exporting to image
#13 exporting layers
#13 exporting layers 9.6s done
#13 exporting manifest sha256:cb3ca99e2288b3d54bead6753a7a85d161a162de5666b8dba8297367272428ce 0.0s done
#13 exporting config sha256:69a02a38b20ce80b3326e547c2744cb515240731e097d12f45953af31d911f76 0.0s done
#13 exporting attestation manifest sha256:811795b52ce2b12bc801df61c2b47babf15571dc7f7b33843a0505a901eaca8c
#13 exporting attestation manifest sha256:811795b52ce2b12bc801df61c2b47babf15571dc7f7b33843a0505a901eaca8c 0.1s done
#13 exporting manifest list sha256:2ef4cec1b9edfe8767131859afbbfa9653394077f0df900f08daaa26ef3d0306 0.0s done
#13 naming to docker.io/library/practice111-app:latest done
#13 unpacking to docker.io/library/practice111-app:latest
#13 unpacking to docker.io/library/practice111-app:latest 4.3s done
#13 DONE 14.2s

#14 resolving provenance for metadata file
#14 DONE 0.0s
[+] up 6/6
 ✔ Image practice111-app            Built                                                                                  24.9s
 ✔ Network practice111_nestnet      Created                                                                                0.1s
 ✔ Volume practice111_postgres_data Created                                                                                0.0s
 ✔ Container practice111-redis-1    Healthy                                                                                20.8s
 ✔ Container practice111-postgres-1 Healthy                                                                                20.8s
 ✔ Container practice111-app-1      Created  

 PS C:\Users\user\Desktop\practice11\practice111> docker compose run --rm app npm run migration:generate -- src/migrations/InitTables
[+]  2/2t 2/22
 ✔ Container practice111-redis-1    Running                                                                                 0.0s
 ✔ Container practice111-postgres-1 Running                                                                                 0.0s
Container practice111-redis-1 Waiting 
Container practice111-postgres-1 Waiting 
Container practice111-postgres-1 Healthy 
Container practice111-redis-1 Healthy 
Container practice111-app-run-97427826f35b Creating 
Container practice111-app-run-97427826f35b Created 

> app@0.0.1 migration:generate
> npm run typeorm -- migration:generate -d src/data-source.ts src/migrations/InitTables


> app@0.0.1 typeorm
> ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/data-source.ts src/migrations/InitTables

Migration /app/src/migrations/1777233207431-InitTables.ts has been generated successfully.
[11:33:46 AM] Starting compilation in watch mode...
app-1       | 
app-1       | [11:33:50 AM] Found 0 errors. Watching for file changes.
app-1       | 
app-1       | [Nest] 34  - 04/27/2026, 11:33:50 AM     LOG [NestFactory] Starting Nest application...
app-1       | [Nest] 34  - 04/27/2026, 11:33:50 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +67ms
app-1       | [Nest] 34  - 04/27/2026, 11:33:50 AM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +1ms
app-1       | [Nest] 34  - 04/27/2026, 11:33:50 AM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
app-1       | [Nest] 34  - 04/27/2026, 11:33:50 AM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
app-1       | [Nest] 34  - 04/27/2026, 11:33:51 AM     LOG [InstanceLoader] CacheModule dependencies initialized +24ms
app-1       | [Nest] 34  - 04/27/2026, 11:33:51 AM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +69ms
app-1       | [Nest] 34  - 04/27/2026, 11:33:51 AM     LOG [RoutesResolver] AppController {/}: +4ms
app-1       | [Nest] 34  - 04/27/2026, 11:33:51 AM     LOG [RouterExplorer] Mapped {/, GET} route +3ms
app-1       | [Nest] 34  - 04/27/2026, 11:33:51 AM     LOG [NestApplication] Nest application successfully started +3ms
postgres-1  | 2026-04-27 11:38:51.663 UTC [28] LOG:  checkpoint starting: time
postgres-1  | 2026-04-27 11:38:51.677 UTC [28] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.004 s, sync=0.002 s, total=0.014 s; sync files=2, longest=0.001 s, average=0.001 s; distance=0 kB, estimate=0 kB; lsn=0/1989510, redo lsn=0/19894D8 

API Endpoints
Method	URL	Опис
GET	/api/categories	Список категорій
GET	/api/categories/:id	Одна категорія
POST	/api/categories	Створити категорію
PATCH	/api/categories/:id	Оновити категорію
DELETE	/api/categories/:id	Видалити категорію
GET	/api/products	Список продуктів
GET	/api/products/:id	Один продукт
POST	/api/products	Створити продукт
PATCH	/api/products/:id	Оновити продукт
DELETE	/api/products/:id	Видалити продукт

## Тест створення категорії

PS C:\Users\user\Desktop\practice11\practice111> docker compose exec postgres psql -U nestuser -d nestdb -c "\dt"
           List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | migrations | table | nestuser
(1 row)

## Тест створення продукту

StatusCode        : 200
StatusDescription : OK
Content           : [{"id":1,"isActive":true,"name":"iPhone16","de
                    scription":null,"price":"999.00","stock":0,"
                    category":{"id":1,"name":"Electronics","desc
                    ription":null,"createdAt":"2026-04-27T17:30:
                    32.186Z"},"createdAt":"2..}]

### Тест 404

PS C:\Users\user\Desktop\practice11\practice111> curl http://localhost:3000/api/products/999
curl : {"message":"Product #999 not found","error":"Not Found","
statusCode":404}








