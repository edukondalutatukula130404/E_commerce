pipeline {

    agent any

    stages {

        stage('Checkout') {

            steps {

                echo "Checking out source code..."

                checkout scm

            }

        }

        stage('Workspace') {

            steps {

                echo "Current Workspace"

                sh 'pwd'

                echo "Project Files"

                sh 'ls -la'

            }

        }

    }

}
