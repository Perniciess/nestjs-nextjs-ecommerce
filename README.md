# Kubernetes Deployment

Ветка содержит экспериментальное развёртывание fullstack-приложения в Kubernetes.

## Цель

Изучение базовых возможностей Kubernetes и практическое развёртывание распределённого веб-приложения на нескольких виртуальных машинах.

## Используемые технологии

* Kubernetes
* Nginx
* NestJS
* Next.js
* PostgreSQL
* Docker

## Тестовый стенд

Для тестирования использовались четыре виртуальные машины.

| VM  | Назначение               |
| --- | ------------------------ |
| VM1 | Kubernetes Control Plane |
| VM2 | Worker Node              |
| VM3 | Worker Node              |
| VM4 | Worker Node              |

Control Plane использовался для управления кластером Kubernetes и оркестрации сервисов.

Для тестирования приложение было распределено между узлами следующим образом:

| Компонент          | Узел |
| ------------------ | ---- |
| Nginx              | VM2  |
| Frontend (Next.js) | VM2  |
| Backend (NestJS)   | VM3  |
| PostgreSQL         | VM4  |

## Реализовано

* Развёртывание сервисов в Kubernetes-кластере.
* Организация взаимодействия между сервисами через Kubernetes Services.
* Публикация приложения через Nginx.
* Тестирование доступа через port-forward.
* Разделение компонентов приложения между несколькими узлами.
* Изучение базовых объектов Kubernetes.

## Архитектура

Client
↓
Nginx (VM2)
↓
Frontend (VM2)
↓
Backend (VM3)
↓
PostgreSQL (VM4)

Control Plane (VM1)
└─ управление кластером Kubernetes

## Что было изучено

* Namespace
* Deployment
* Service
* Межсервисное взаимодействие
* Внутрикластерная сеть Kubernetes
* Развёртывание распределённого приложения
* Port Forwarding

## Доступ к приложению

Проброс портов к сервису Nginx:

```bash
kubectl port-forward -n app svc/nginx 8080:80 8443:443
```

После запуска приложение доступно по адресу:

```text
https://localhost:8443
```

## Статус

Учебная ветка для исследования Kubernetes и различных вариантов развёртывания fullstack-приложений.
