pipeline {
    agent any

    environment {
        APP_NAME = "smart-service-portal"
        K8S_SERVICE = "smart-service-nodeport"
        IMAGE_NAME = "smart-service-portal:latest"
        // Ensure Jenkins can find the Minikube and K8s configuration on Windows
        MINIKUBE_HOME = "C:/Users/ritik"
        KUBECONFIG = "C:/Users/ritik/.kube/config"
    }

    stages {
        stage('1. Git Checkout') {
            steps {
                echo '>>> Stage 1: Pulling latest code from GitHub...'
                checkout scm
                echo 'Source code synchronized.'
            }
        }

        stage('2. Docker Build') {
            steps {
                echo '>>> Stage 2: Building Docker Image...'
                bat "docker build -t ${IMAGE_NAME} ."
                echo 'Docker image built successfully.'
            }
        }

        stage('3. Minikube Image Load') {
            steps {
                echo '>>> Stage 3: Loading Image into Minikube...'
                // This ensures Minikube uses the local image instead of trying to pull from Docker Hub
                bat "minikube image load ${IMAGE_NAME}"
                echo 'Image loaded into Minikube cluster.'
            }
        }

        stage('4. Kubernetes Deploy') {
            steps {
                echo '>>> Stage 4: Deploying to Kubernetes Cluster...'
                // Apply all manifests in the k8s directory
                bat 'kubectl apply -f k8s/'
                echo 'Kubernetes manifests applied.'
            }
        }

        stage('5. System Verification') {
            steps {
                echo '>>> Stage 5: Verifying Deployment Status...'
                echo 'Current Pods:'
                bat 'kubectl get pods'
                echo 'Current Services:'
                bat 'kubectl get services'
            }
        }

        stage('6. Application Access') {
            steps {
                echo '>>> Stage 6: Demo Instructions...'
                echo '-------------------------------------------------------'
                echo 'PROJECT IS LIVE AND FULLY ORCHESTRATED'
                echo 'To access the application, run the following command:'
                echo "minikube service ${K8S_SERVICE}"
                echo '-------------------------------------------------------'
            }
        }
    }

    post {
        success {
            echo '✅ PIPELINE SUCCESS: Smart Service Portal is ready for Evaluation!'
        }
        failure {
            echo '❌ PIPELINE FAILED: Please check the Jenkins console output for errors.'
        }
    }
}