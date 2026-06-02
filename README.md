# Docker Swarm Deployment

Ветка содержит экспериментальное развёртывание fullstack-приложения в Docker Swarm.

## Цель

Изучение возможностей Docker Swarm для оркестрации сервисов, распределения нагрузки между узлами и организации отказоустойчивого окружения для веб-приложения.

## Используемые технологии

* Docker Swarm
* Nginx
* NestJS
* Next.js
* PostgreSQL

## Тестовый стенд

Для тестирования использовались четыре виртуальные машины.

| VM  | Назначение                     |
| --- | --------------------------     |
| VM1 | Swarm Manager                  |
| VM2 | Nginx + Frontend (Next.js)     |
| VM3 | Backend (NestJS) + Postgresql  |
| VM4 | PostgreSQL                     |

Swarm Manager использовался для управления кластером и развёртывания сервисов.

## Реализовано

* Развёртывание приложения через Docker Stack.
* Распределение сервисов между несколькими узлами Docker Swarm.
* Использование labels для управления размещением контейнеров.
* Организация сетевого взаимодействия между сервисами.
* Публикация приложения через Nginx.
* Эксперименты с отказоустойчивостью сервисов.
* Использование общего NFS-хранилища для хранения данных.

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

Swarm Manager (VM1)
└─ управление кластером Docker Swarm

## Что было изучено

* Docker Swarm
* Docker Stack
* Service Placement
* Node Labels
* Overlay Networks
* NFS Volumes
* Failover сценарии
* Jenkins

## Failover сценарий
Если  VM4 падает, то на VM3 должен развернуться контейнер PostgreSQL смонтированный к NFS-хранилищу.

## Тестирование
Отдельный настроенный Jenkins контейнер для проверки работоспособности эндпоинтов.

## Запуск

Инициализация кластера:

```bash
docker swarm init --advertise-addr <MANAGER_IP>
```

Развёртывание стека:

```bash
docker stack deploy -c docker-stack.yml ecommerce
```

Проверка сервисов:

```bash
docker stack services ecommerce
```

## Статус

Учебная ветка для исследования Docker Swarm и различных сценариев развёртывания fullstack-приложений.
