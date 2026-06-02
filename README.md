# K3S + Patroni Deployment

Ветка содержит экспериментальное развёртывание fullstack-приложения в Kubernetes (K3S) с отказоустойчивым PostgreSQL-кластером на базе Patroni.

## Цель

Изучение:

* Kubernetes (K3S);
* сетевого взаимодействия между узлами кластера;
* развёртывания распределённых приложений;
* организации отказоустойчивого PostgreSQL-кластера через Patroni.

## Стек

### Application

* NestJS
* Next.js
* PostgreSQL
* Nginx

### Infrastructure

* K3S
* Calico
* Patroni
* PostgreSQL
* Kubernetes Services

## Тестовый стенд

Для тестирования использовались четыре виртуальные машины.

| VM  | Назначение          |
| --- | ------------------- |
| VM1 | K3S Control Plane   |
| VM2 | Worker Node (`app`) |
| VM3 | Worker Node (`db`)  |
| VM4 | Worker Node (`db`)  |

## Сетевая схема

Для связи между виртуальными машинами использовалась отдельная внутренняя подсеть.

Пример настройки Netplan:

```yaml
network:
  version: 2
  ethernets:
    enp0s3:
      dhcp4: true
    enp0s8:
      dhcp4: false
      addresses:
        - 10.10.10.10/24
```

Адреса узлов:

| Host    | IP          |
| ------- | ----------- |
| master  | 10.10.10.10 |
| worker2 | 10.10.10.11 |
| worker3 | 10.10.10.12 |
| worker4 | 10.10.10.13 |

Для корректного взаимодействия между узлами использовались hostname и записи в `/etc/hosts`.

## Развёртывание кластера

### 1. Установка K3S

K3S устанавливался без встроенного Flannel.

### 2. Установка Calico

После установки K3S в качестве CNI использовался Calico.

### 3. Подключение Worker Nodes

Worker-узлы подключались к Control Plane через токен K3S.

### 4. Разметка узлов

Для разделения ролей использовались Kubernetes Labels.

| Node    | Label |
| ------- | ----- |
| worker2 | app   |
| worker3 | db    |
| worker4 | db    |

### 5. Namespace

Использовались отдельные пространства имён:

| Namespace | Назначение           |
| --------- | -------------------- |
| ecommerce | приложение           |
| database  | PostgreSQL и Patroni |

### 6. Развёртывание Patroni

Patroni устанавливался через Kubernetes-манифесты.

Проверка состояния:

```bash
kubectl get pods -A
```

или

```bash
kubectl get pods -n database
```

### 7. Настройка приложения

После развёртывания PostgreSQL-кластера параметры подключения передавались в Kubernetes Secrets и использовались приложением NestJS.

## Архитектура

Client
↓
Nginx
↓
Next.js
↓
NestJS
↓
Patroni Cluster
↓
PostgreSQL

K3S Control Plane
└─ управление кластером

## Что было изучено

* K3S
* Calico
* Kubernetes Labels
* Namespaces
* Kubernetes Services
* Patroni
* PostgreSQL High Availability
* Развёртывание распределённых приложений на нескольких виртуальных машинах

## Статус

Учебная ветка для исследования Kubernetes и PostgreSQL High Availability через Patroni.
