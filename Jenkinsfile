pipeline {
    agent any

    environment {
        STACK = "main_stack"

        FRONTEND_IMAGE = "exzenzia/frontend:v4.6"
        BACKEND_IMAGE  = "exzenzia/backend:v4.6"
        DB_IMAGE       = "exzenzia/database:v2"

        NEXT_PUBLIC_API_BASE_URL = "https://192.168.0.1/api"
        NEST_WEB_URL = "https://192.168.0.1"
        
        FRONTEND_URL = 'https://192.168.0.1'
        
        DB_SERVICE   = "db"
        DB_USER      = "postgres"
        DB_PASSWORD  = "1"
        DB_NAME      = "mydb"

        DATABASE_URL = "postgresql://postgres:1@db:5432/mydb?schema=public&connection_limit=5&pool_timeout=0&connect_timeout=10"
        NODE_ENV     = "production"
        JWT_SECRET   = "supersecretkey"
        CLIENT_URL   = "https://192.168.0.1"
        COOKIE_DOMAIN= "192.168.0.1"
    }

    **stages {**

        stage('Deploy to Swarm') {
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

        stage('Tests') {
            steps {
                script {
                    sleep 15

                    echo "Checking frontend availability..."
                    sh "curl -kf ${FRONTEND_URL} || (echo 'Frontend DOWN' && exit 1)"

                    echo "Locating PostgreSQL container..."

                    def dbContainer = sh(
                        script: "docker ps --filter name=${STACK}_${DB_SERVICE} --format '{{.ID}}'",
                        returnStdout: true
                    ).trim()

                    if (!dbContainer) error("No PostgreSQL container found!")

                    echo "Testing database..."
                    sh "docker exec ${dbContainer} psql -U ${DB_USER} -d ${DB_NAME} -c 'SELECT NOW();'"
                }
            }
        }
    **}**

    post {
        success { echo "Deployment succeeded!" }
        failure { echo "Deployment failed!" }
        always  { cleanWs() }
    }
}
