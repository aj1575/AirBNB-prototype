#!/bin/bash

echo "🚀 Deploying Airbnb Application to Kubernetes..."

# Apply secrets and configmap first
echo "📝 Creating secrets and configmap..."
kubectl apply -f secrets.yaml
kubectl apply -f configmap.yaml
kubectl apply -f frontend-nginx-config.yaml

# Deploy databases
echo "💾 Deploying databases..."
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mongodb-deployment.yaml

# Wait for databases to be ready
echo "⏳ Waiting for databases to be ready..."
kubectl wait --for=condition=ready pod -l app=mysql --timeout=120s
kubectl wait --for=condition=ready pod -l app=mongodb --timeout=120s

# Deploy Kafka infrastructure
echo "📨 Deploying Kafka infrastructure..."
kubectl apply -f zookeeper-deployment.yaml
sleep 10
kubectl apply -f kafka-deployment.yaml

# Wait for Kafka to be ready
echo "⏳ Waiting for Kafka to be ready..."
kubectl wait --for=condition=ready pod -l app=zookeeper --timeout=60s
kubectl wait --for=condition=ready pod -l app=kafka --timeout=120s

# Deploy application services
echo "🎯 Deploying application services..."
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml

# Wait for application to be ready
echo "⏳ Waiting for application to be ready..."
kubectl wait --for=condition=ready pod -l app=backend --timeout=120s
kubectl wait --for=condition=ready pod -l app=frontend --timeout=120s

# Deploy ingress
echo "🌐 Deploying ingress..."
kubectl apply -f ingress.yaml

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Checking deployment status..."
kubectl get pods
echo ""
kubectl get services
echo ""
echo "🔗 Access the application:"
echo "   - Frontend: http://localhost (or LoadBalancer IP)"
echo "   - Backend API: http://localhost/api"
echo ""
echo "💡 Useful commands:"
echo "   - View pods: kubectl get pods"
echo "   - View logs: kubectl logs <pod-name>"
echo "   - Scale backend: kubectl scale deployment backend-deployment --replicas=3"
echo "   - Delete all: kubectl delete -f ."
