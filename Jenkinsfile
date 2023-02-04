pipeline {
    environment {
        registry = "tsandaru/nodejs-cicd-1"
        registryCredentials = 'thee_docker'
        dockerImage = ''
    }
    agent any
    stages {
        stage('Building Image') {
            steps {
                script {
                    dockerImage = docker.build("$registry:latest")
                }
            }
        }

        stage("Push Image"){
            steps{
                script{
                    docker.withRegistry('', registryCredentials) {
                        dockerImage.push("latest")
                    }
                }
            }
        }
        stage('Deploying into k8s'){
            steps{
                sh 'kubectl apply -f deployment.yaml'
            }
        }

        stage('Apply service'){
            steps{
                sh 'kubectl apply -f service.yaml'
            }
        }
    }
}
