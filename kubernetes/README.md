# Kubernetes манифесты для e-commerce

## Структура

### Namespaces
- `app` - для backend, frontend, nginx
- `database` - для CloudNativePG кластера

### Компоненты

#### Backend
- **Deployment**: backend
- **Service**: backend:3000
- **Secret**: backend-secret (DATABASE_URL, JWT_SECRET и др.)
- **PVC**: backend-uploads-pvc (5Gi)

#### Frontend
- **Deployment**: frontend
- **Service**: frontend:3000
- **ConfigMap**: frontend-config (NEXT_PUBLIC_API_BASE_URL)

#### Nginx
- **Deployment**: nginx
- **Service**: nginx (LoadBalancer на 192.168.1.100)
- **ConfigMap**: nginx-config (конфигурация nginx)
- **Secret**: nginx-ssl (SSL сертификаты)

#### Database (CloudNativePG)
- **Cluster**: pg-cluster (2 реплики)
- **Services**: pg-cluster-rw, pg-cluster-ro, pg-cluster-r

## Требования

1. **k3d кластер** с нодами:
   - `agent-0` - с label `workload=app` (для backend, frontend, nginx)
   - `agent-1` - с label `workload=db` (для PostgreSQL)
   - `agent-2` - с label `workload=db` (для PostgreSQL)

2. **CloudNativePG оператор** установлен в namespace `cnpg-system`

3. **Docker образы**:
   - `backend:latest`
   - `frontend:latest`

## Развертывание

### 1. Установка меток на ноды

```bash
# Метка для приложений
kubectl label nodes k3d-e-commerce-agent-0 workload=app

# Метки для БД
kubectl label nodes k3d-e-commerce-agent-1 workload=db
kubectl label nodes k3d-e-commerce-agent-2 workload=db
```

### 2. Создание namespace

```bash
kubectl apply -f namespace.yaml
```

### 3. Развертывание PostgreSQL кластера

```bash
# Создать namespace для БД
kubectl create namespace database

# Применить манифест кластера
kubectl apply -f postgres-cluster.yaml

# Проверить статус
kubectl get cluster -n database
kubectl get pods -n database
```

### 4. Получение пароля от БД

```bash
# Получить пароль пользователя app
kubectl get secret pg-cluster-app -n database -o jsonpath='{.data.password}' | base64 -d
echo

# Обновить backend-secret.yaml с правильным паролем в DATABASE_URL
```

### 5. Развертывание приложения

```bash
# Применить все манифесты
kubectl apply -f backend-secret.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend-configmap.yaml
kubectl apply -f frontend.yaml
kubectl apply -f nginx-ssl-secret.yaml
kubectl apply -f nginx-configmap.yaml
kubectl apply -f nginx.yaml

# Или применить все сразу
kubectl apply -f .
```

### 6. Проверка развертывания

```bash
# Проверить поды
kubectl get pods -n app -o wide

# Проверить сервисы
kubectl get svc -n app

# Проверить логи
kubectl logs -n app deployment/backend
kubectl logs -n app deployment/frontend
kubectl logs -n app deployment/nginx
```

## Важные моменты

### Database URL
В `backend-secret.yaml` нужно обновить пароль:
```
DATABASE_URL: "postgresql://app:YOUR_PASSWORD@pg-cluster-rw.database.svc.cluster.local:5432/app"
```

### SSL сертификаты
Сертификаты из `nginx/ssl/` уже встроены в `nginx-ssl-secret.yaml` в base64.

### Порты
- Backend: 3000
- Frontend: 3000
- Nginx: 80 (HTTP), 443 (HTTPS)

### NodeSelector
Все поды приложения размещаются на `agent-0` с помощью:
```yaml
nodeSelector:
  workload: app
```

## Обновление образов

### Backend
```bash
# Пересобрать образ
docker build -t backend:latest -f backend/backend.Dockerfile backend/

# Импортировать в k3d
k3d image import backend:latest -c e-commerce

# Перезапустить deployment
kubectl rollout restart deployment/backend -n app
```

### Frontend
```bash
# Пересобрать образ
docker build -t frontend:latest -f frontend/frontend.Dockerfile frontend/

# Импортировать в k3d
k3d image import frontend:latest -c e-commerce

# Перезапустить deployment
kubectl rollout restart deployment/frontend -n app
```

## Масштабирование

```bash
# Увеличить реплики backend
kubectl scale deployment/backend --replicas=2 -n app

# Увеличить реплики frontend
kubectl scale deployment/frontend --replicas=2 -n app
```

## Удаление

```bash
# Удалить приложения
kubectl delete -f nginx.yaml
kubectl delete -f frontend.yaml
kubectl delete -f backend.yaml

# Удалить конфигурацию
kubectl delete -f nginx-configmap.yaml
kubectl delete -f nginx-ssl-secret.yaml
kubectl delete -f frontend-configmap.yaml
kubectl delete -f backend-secret.yaml

# Удалить БД (осторожно!)
kubectl delete -f postgres-cluster.yaml

# Удалить namespace
kubectl delete namespace app
kubectl delete namespace database
```

## Troubleshooting

### Поды не запускаются
```bash
kubectl describe pod <pod-name> -n app
kubectl logs <pod-name> -n app
```

### Backend не может подключиться к БД
```bash
# Проверить сервис БД
kubectl get svc -n database

# Проверить подключение
kubectl exec -it deployment/backend -n app -- sh
# внутри контейнера:
nc -zv pg-cluster-rw.database.svc.cluster.local 5432
```

### Nginx не работает
```bash
# Проверить конфигурацию
kubectl exec -it deployment/nginx -n app -- nginx -t

# Проверить логи
kubectl logs deployment/nginx -n app
```
