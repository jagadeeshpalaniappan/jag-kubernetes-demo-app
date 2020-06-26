# Kubernetes Microservice (Sample Node.js App)

This is a sample Book Store (Microservices) Application, This has

- API Gateway (Node.js App)
- Microservice: Auth API (Node.js App)
- Microservice: Books API (Node.js App)

## Local Setup

### Step1: Machine Setup

(skip this if you already installed docker & minikube)

```s
# Install Docker Desktop
https://www.docker.com/products/docker-desktop

# Install `minikube`
brew install minikube

# Start Minikube
minikube start --vm=true
```

### Step2: App Setup (Build Docker Images)

```s
eval $(minikube docker-env)

docker build ./api-gateway -t jag-api-gateway-img:v1.0.0
docker build ./auth-api -t jag-auth-api-img:v1.0.0
docker build ./books-api -t jag-books-api-img:v1.0.0
docker images
```

### Step3: App Setup (Deploy docker images - in Kubernetes)

```s
# create: nameSpace
kubectl create namespace book-store-ns

# set: namespace `book-store-ns` for the current context
kubectl config set-context --current --namespace=book-store-ns

# check: namespace is set properly for the currentContext
kubectl config get-contexts

# create: all kubernetes objects (reqd for this project)
# [ deployments, pods, services ]
kubectl apply -f ./kubernetes-setup/

# check: all pods are running
kubectl get pods

# check: all objects
kubectl get all -n book-store-ns

# Get: API-GATEWAY-URL
minikube service jag-api-gateway-service --url --namespace=book-store-ns

# Open the URL in browser
# sample: http://127.0.0.1:51517/hello
http://127.0.0.1:<YOUR-PORT>/hello

```
