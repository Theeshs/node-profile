pipeline {
    environment {
        registry = "tsandaru/nodejs-cicd-1"
        registryCredentials = 'thee_docker'
        dockerImage = ''
    }
    tools {
        nodejs 'node 19.5.0'
    }
    agent any
    stages {
        stage('Check node version') {
            steps {
                bat 'npm --version'
            }
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Building Image') {
            steps {
                script {
                    dockerImage = docker.build.registry + ":latest"
                }
            }
        }

        stage("Push Image"){
            steps{
                script{
                    docker.withRegistry('', registryCredentials){
                        dockerImage.push()
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