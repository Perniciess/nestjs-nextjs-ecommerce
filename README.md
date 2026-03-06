### Todo list
- [x] Fix "ENOENT"
- [x] Started working on redesigning the frontend part:
  - [x] Return widgets/description and catalog
  - [x] Fix FSD design features/auth
  - [x] Fix FSD design in entities
  - [x] Check FSD errors in widgets
  - [ ] Add Zustand

### Notes for dev
`NEST_WEB_URL="http://localhost:3000/"`

"ENOENT" if request on wrong URL

## Docker Swarm deployment (single stack file)

Используется один файл: `docker-stack.yml`.

Распределение контейнеров по нодам задается через labels:
- `master (192.168.0.1)`: `frontend`, `backend`, `nginx`, `maxscale`
- `worker1 (192.168.0.2)`: `mariadb1`
- `worker2 (192.168.0.3)`: `mariadb2`

Для отказоустойчивости:
- `mariadb1 + mariadb2` работают как Galera Cluster
- `maxscale` дает backend единый endpoint и переключает трафик на живую ноду

### 1) Инициализация Swarm

На `master (192.168.0.1)`:

```bash
docker swarm init --advertise-addr 192.168.0.1
```

Скопируй join-команду и выполни на `worker1` и `worker2`.

### 2) Назначение labels (на master)

Посмотри имена нод:

```bash
docker node ls
```

Назначь labels:

```bash
docker node update --label-add app_role=master <MASTER_NODE_NAME>
docker node update --label-add db_role=worker1 <WORKER1_NODE_NAME>
docker node update --label-add db_role=worker2 <WORKER2_NODE_NAME>
```

### 3) Сборка образов приложения (на master)

```bash
docker build -t ecommerce-backend:swarm -f backend/backend.Dockerfile backend
docker build -t ecommerce-frontend:swarm -f frontend/frontend_optimized.Dockerfile frontend
```

### 4) Деплой стека (на master)

```bash
docker stack deploy -c docker-stack.yml ecommerce
```

Проверка:

```bash
docker stack services ecommerce
docker service ps ecommerce_mariadb1
docker service ps ecommerce_mariadb2
docker service ps ecommerce_backend
docker service logs -f ecommerce_maxscale
```

### 5) Проверка БД кластера

```bash
docker exec -it $(docker ps -q -f name=ecommerce_mariadb1) mysql -uroot -prootpass -e "SHOW STATUS LIKE 'wsrep_cluster_size';"
```

Ожидаемо: `wsrep_cluster_size = 2`.

### 6) Тест failover

Отключи worker1 из планировщика:

```bash
docker node update --availability drain <WORKER1_NODE_NAME>
```

Проверь, что backend продолжает отдавать данные через `maxscale` (переключение на `mariadb2`).

Вернуть ноду:

```bash
docker node update --availability active <WORKER1_NODE_NAME>
```

### Важно
- Открой между VM порты `3306, 4567, 4568, 4444` (для Galera/SST).
- Первый bootstrap кластера делает `mariadb1` автоматически только на пустом volume.
- Файл деплоя: [docker-stack.yml](/home/pernicies/Projects/e-commerce/docker-stack.yml)

shadcnui
