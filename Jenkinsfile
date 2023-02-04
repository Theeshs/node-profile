pipeline {
    environment {
        registry = "tsandaru/nodejs-cicd-1"
        registryCredentials = 'thee_docker'
        dockerImage = ''
    }
    agent any
    // tools { nodejs "nodejs" }
    stages {
        stage('Building Image') {
            steps {
                script {
                    try {
                        docker.build registry
                        dockerImage = "${registry}:latest"
                    } catch (e) {
                        currentBuild.result = 'FAILED'
                        throw e
                    }
                }
            }
        }

        stage("Push Image"){
            steps{
                script{
                    try {
                        docker.withDockerRegistry('', registryCredentials){
                            dockerImage.push()
                        }
                    } catch (e) {
                        currentBuild.result = 'FAILED'
                        throw e
                    }
                }
            }
        }
        stage('Deploying into k8s'){
            steps{
                try {
                    sh 'kubectl apply -f deployment.yaml'
                } catch (e) {
                    currentBuild.result = 'FAILED'
                    throw e
                }
            }
        }

        stage('Apply service'){
            steps{
                try {
                    sh 'kubectl apply -f service.yaml'
                } catch (e) {
                    currentBuild.result = 'FAILED'
                    throw e
                }
            }
        }
    }
}
