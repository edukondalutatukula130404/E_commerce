pipeline {

    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    triggers {
        githubPush()
    }

    environment {
        SERVER = "ubuntu@192.168.88.33"
        APP_PATH = "/home/ubuntu/E_commerce"
        FRONTEND_PATH = "/var/www/ecommerce"
        PM2_APP = "ecommerce-backend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                sh """
                rsync -avz --delete backend/ ${SERVER}:${APP_PATH}/backend/
                """

                sh """
                ssh ${SERVER} '
                cd ${APP_PATH}/backend
                npm install
                '
                """
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh """
                rsync -avz --delete frontend/dist/ ${SERVER}:${FRONTEND_PATH}/
                """
            }
        }

        stage('Restart Backend') {
            steps {
                sh """
                ssh ${SERVER} '
                pm2 restart ${PM2_APP}
                pm2 save
                sudo /usr/bin/systemctl reload nginx
                '
                """
            }
        }

        stage('Health Check') {
            steps {
                sh """
                curl -I https://ecom.speshway.site
                """
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}
