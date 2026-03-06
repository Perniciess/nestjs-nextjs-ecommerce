pipeline {
    agent any

    environment {
        STACK = "app"

        FRONTEND_IMAGE = "exzenzia/frontend:v5"
        BACKEND_IMAGE  = "exzenzia/backend:v4.6"
        DB_IMAGE       = "exzenzia/database:v2.1"

        FRONTEND_URL = 'https://192.168.0.1'

        DB_SERVICE   = "db"
        DB_USER      = "postgres"
        DB_PASSWORD  = "1"
        DB_NAME      = "mydb"
    }

    stages {

        stage('1. Проверка фронтенда') {
            steps {
                script {
                    echo "Проверяем фронтенд..."
                    sh "curl -kf ${FRONTEND_URL} || (echo 'Фронтенд недоступен' && exit 1)"
                }
            }
        }

        stage('2. Проверка базы данных') {
            steps {
                script {
                    echo "Checking PostgreSQL node..."
                    def nodeName = sh(
                        script: "docker service ps ${STACK}_${DB_SERVICE} --format '{{.Node}}' | head -n 1 || true",
                        returnStdout: true
                    ).trim()
                    echo "Database is running on node: ${nodeName}"
                    if (nodeName == "worker2") {
                        error("Database is still on worker1 or worker2!")
                    }
                }
            }
        }
stage('3. Проверка регистрации пользователя') {
    steps {
        script {
            echo "Тестирование дубликата логина."

            def payload = """
                {
                    "email": "a2@a2.com",
                    "login": "a1",
                    "password": "m1i2x3_m1i2x3"
                }
            """

            echo "Пытаемся зарегистрировать пользователя с существующим логином..."
            def response = sh(
                script: """
                    curl -k -s -w "\\n%{http_code}" \
                    -X POST "${FRONTEND_URL}/api/auth/sign-up" \
                    -H "Content-Type: application/json" \
                    -d '${payload}'
                """,
                returnStdout: true
            ).trim()

            def lines = response.readLines()
            def responseBody = lines[0..-2].join("\n")
            def responseCode = lines[-1]

            echo "Response code: ${responseCode}"
            echo "Response body: ${responseBody}"

            // --- новая логика ---
            if (responseCode == "400" || responseCode == "409" || responseBody.contains("Логин уже используется")) {
                error("Ошибка: сервер сообщил, что логин уже занят — тест провален!")
            }

            echo "Регистрация прошла успешно — тест пройден."
        }
    }
}


    }

    post {
        success { echo "Развертывание завершилось успешно!" }
        failure { echo "Не удалось выполнить развертывание!" }
        always  { cleanWs() }
    }
}
