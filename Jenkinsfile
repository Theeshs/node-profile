pipeline {
    environment {
        registry = "tsandaru/nodejs-cicd-1"
        registryCredentials = 'thee_docker'
        dockerImage = ''
    }
    agent any
    tools { nodejs "nodejs" }
    stages {
        // stage('Check node version') {
        //     steps {
        //         sh 'npm --version'
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         script {
        //             sh 'npm install'
        //         }
        //     }
        // }

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