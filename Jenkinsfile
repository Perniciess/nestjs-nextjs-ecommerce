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

        stage('Deploy to Swarm') {
            steps {
                script {
                    sh """
                        # Инициализация Swarm, если нужно
                        if ! docker info | grep -q 'Swarm: active'; then
                            docker swarm init || true
                        fi

                        # Деплой стека
                        docker stack deploy --with-registry-auth -c docker-compose.yaml ${STACK}
                    """
                }
            }
        }

        stage('Tests') {
            steps {
                script {
                    // Проверка фронтенда
                    echo "Checking frontend availability..."
                    sh "curl -kf ${FRONTEND_URL} || (echo 'Frontend DOWN' && exit 1)"

                    // Проверка ноды с базой
                    echo "Checking PostgreSQL node..."

		    def nodeName = sh(
    			script: "docker service ps main_stack_db --format '{{.Node}}' | head -n 1 || true",
    			returnStdout: true
		    ).trim()
                    
                    echo "Database is running on node: ${nodeName}"

                    // Проверка: база должна быть на другой ноде
                    if (nodeName == "worker1" || nodeName == "worker2") {
                        error("Database is still on worker1 or worker2!")
                    }
                }
            }
        }
    }

    post {
        success { echo "Deployment succeeded!" }
        failure { echo "Deployment failed!" }
        always  { cleanWs() }
    }
}
