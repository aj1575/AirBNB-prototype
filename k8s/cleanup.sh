#!/bin/bash

echo "🗑️  Cleaning up Kubernetes resources..."

kubectl delete -f ingress.yaml
kubectl delete -f frontend-deployment.yaml
kubectl delete -f backend-deployment.yaml
kubectl delete -f kafka-deployment.yaml
kubectl delete -f zookeeper-deployment.yaml
kubectl delete -f mongodb-deployment.yaml
kubectl delete -f mysql-deployment.yaml
kubectl delete -f frontend-nginx-config.yaml
kubectl delete -f configmap.yaml
kubectl delete -f secrets.yaml

echo "✅ Cleanup complete!"
