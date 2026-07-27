pipeline {

    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    environment {

        SERVER = "ubuntu@192.168.88.33"

        APP_PATH = "/home/ubuntu/E_commerce"

        FRONTEND_PATH = "/var/www/ecommerce"

        PM2_APP = "ecommerce-backend"

    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Backend Dependencies') {
            steps {
                dir('backend') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh '''
                        npm install
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            steps {

                sh """

                ssh ${SERVER} '

                cd ${APP_PATH}

                git fetch origin

                git reset --hard origin/master

                cd backend

                npm install

                '

                """

            }
        }

        stage('Deploy Frontend') {

            steps {

                sh """

                rsync -avz --delete \
                frontend/dist/ \
                ${SERVER}:${FRONTEND_PATH}/

                """

            }

        }

        stage('Restart PM2') {

            steps {

                sh """

                ssh ${SERVER} '

                pm2 restart ${PM2_APP}

                pm2 save

                '

                """

            }

        }

        stage('Reload Nginx') {

            steps {

                sh """

                ssh ${SERVER} '

                sudo systemctl reload nginx

                '

                """

            }

        }

        stage('Health Check') {

            steps {

                sh '''

                curl -I https://ecom.speshway.site

                '''

            }

        }

    }

    post {

        success {

            echo "======================================"

            echo "Deployment Successful"

            echo "https://ecom.speshway.site"

            echo "======================================"

        }

        failure {

            echo "======================================"

            echo "Deployment Failed"

            echo "Check Console Output"

            echo "======================================"

        }

    }

}
