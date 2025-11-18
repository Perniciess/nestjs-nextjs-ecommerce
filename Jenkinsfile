pipeline {
    agent any

    environment {
        STACK = "main_stack"

        FRONTEND_IMAGE = "exzenzia/frontend:v4.6"
        BACKEND_IMAGE  = "exzenzia/backend:v4.6"
        DB_IMAGE       = "exzenzia/database:v2"

        FRONTEND_URL = 'https://192.168.0.1'

        DB_SERVICE   = "db"
        DB_USER      = "postgres"
        DB_PASSWORD  = "1"
        DB_NAME      = "mydb"
    }

    stages {

        stage('1. Развертывание') {
            steps {
                script {
                    sh """
                        if ! docker info | grep -q 'Swarm: active'; then
                            docker swarm init || true
                        fi
                        docker stack deploy --with-registry-auth -c docker-compose.yaml ${STACK}
                    """
                }
            }
        }

        stage('2. Проверка фронтенда') {
            steps {
                script {
                    echo "Проверяем фронтенд..."
                    sh "curl -kf ${FRONTEND_URL} || (echo 'Фронтенд недоступен' && exit 1)"
                }
            }
        }

        stage('3. Проверка базы данных') {
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

        stage('4. Проверка регистрации пользователя') {
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
                            curl -s -w "\\n%{http_code}" \
                            -X POST "${FRONTEND_URL}/auth/sign-up" \
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

                    if (responseCode != "400" && responseCode != "409") {
                        error("Expected 400 (duplicate login), but got: ${responseCode}")
                    }
                    if (!responseBody.contains("Логин уже используется")) {
                        error("Expected error message 'Логин уже используется', but got: ${responseBody}")
                    }

                    echo "Тестирование регистрации: ПРОЙДЕНО"
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
