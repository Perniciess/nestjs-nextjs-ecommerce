#!/bin/bash

set -e

echo "=== E-Commerce Kubernetes Deployment ==="
echo ""

# Проверка наличия kubectl
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl не найден. Установите kubectl."
    exit 1
fi

# Проверка наличия k3d
if ! command -v k3d &> /dev/null; then
    echo "❌ k3d не найден. Установите k3d."
    exit 1
fi

echo "✓ kubectl и k3d найдены"
echo ""

# Установка меток на ноды
echo "1. Установка меток на ноды..."
kubectl label nodes k3d-e-commerce-agent-0 workload=app --overwrite
kubectl label nodes k3d-e-commerce-agent-1 workload=db --overwrite
kubectl label nodes k3d-e-commerce-agent-2 workload=db --overwrite
echo "✓ Метки установлены"
echo ""

# Создание namespace
echo "2. Создание namespace app..."
kubectl apply -f namespace.yaml
echo "✓ Namespace создан"
echo ""

# Проверка наличия PostgreSQL кластера
echo "3. Проверка PostgreSQL кластера..."
if kubectl get cluster pg-cluster -n database &> /dev/null; then
    echo "✓ PostgreSQL кластер уже существует"

    # Получение пароля
    echo ""
    echo "Пароль пользователя 'app' в БД:"
    kubectl get secret pg-cluster-app -n database -o jsonpath='{.data.password}' 2>/dev/null | base64 -d || echo "Секрет не найден"
    echo ""
    echo ""
    echo "⚠️  ВАЖНО: Обновите пароль в файле backend-secret.yaml"
    echo "   DATABASE_URL: postgresql://app:LTyC7tzC4cybvHhbXcU9EEeA5CJ82NaOguMdWVyA7AJaZSuOvcOL0kQIfqQy5B2I@pg-cluster-rw.database.svc.cluster.local:5432/app"
    echo ""
    read -p "Нажмите Enter для продолжения..."
else
    echo "⚠️  PostgreSQL кластер не найден в namespace database"
    echo "   Создайте кластер: kubectl apply -f postgres-cluster.yaml"
    exit 1
fi

# Сборка образов (опционально)
echo ""
read -p "4. Хотите пересобрать Docker образы? (y/N): " build_images
if [[ "$build_images" =~ ^[Yy]$ ]]; then
    echo "Сборка backend..."
    docker build -t backend:latest -f ../backend/backend.Dockerfile ../backend/

    echo "Сборка frontend..."
    docker build -t frontend:latest -f ../frontend/frontend.Dockerfile ../frontend/

    echo "Импорт образов в k3d..."
    k3d image import backend:latest -c e-commerce
    k3d image import frontend:latest -c e-commerce

    echo "✓ Образы собраны и импортированы"
else
    echo "⊘ Пропуск сборки образов"
fi
echo ""

# Развертывание приложения
echo "5. Развертывание приложения..."

echo "   - Backend secret..."
kubectl apply -f backend-secret.yaml

echo "   - Backend..."
kubectl apply -f backend.yaml

echo "   - Frontend config..."
kubectl apply -f frontend-configmap.yaml

echo "   - Frontend..."
kubectl apply -f frontend.yaml

echo "   - Nginx SSL..."
kubectl apply -f nginx-ssl-secret.yaml

echo "   - Nginx config..."
kubectl apply -f nginx-configmap.yaml

echo "   - Nginx..."
kubectl apply -f nginx.yaml

echo "✓ Приложение развернуто"
echo ""

# Ожидание готовности подов
echo "6. Ожидание готовности подов..."
kubectl wait --for=condition=ready pod -l app=backend -n app --timeout=120s || true
kubectl wait --for=condition=ready pod -l app=frontend -n app --timeout=120s || true
kubectl wait --for=condition=ready pod -l app=nginx -n app --timeout=120s || true
echo ""

# Проверка статуса
echo "7. Статус развертывания:"
echo ""
kubectl get pods -n app -o wide
echo ""
kubectl get svc -n app
echo ""

echo "=== Развертывание завершено ==="
echo ""
echo "Приложение доступно по адресу: https://192.168.1.100"
echo ""
echo "Полезные команды:"
echo "  kubectl get pods -n app -o wide"
echo "  kubectl logs -n app deployment/backend"
echo "  kubectl logs -n app deployment/frontend"
echo "  kubectl logs -n app deployment/nginx"
echo ""
