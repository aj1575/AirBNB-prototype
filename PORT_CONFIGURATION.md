# Port Configuration Summary

## Docker Compose Setup

### External Ports (Access from your Mac)
- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:5001
- **MongoDB**: localhost:27017
- **Kafka**: localhost:9093
- **Zookeeper**: localhost:2181

### Internal Container Ports (Inside Docker network)
- **Frontend container**: Port 80 (nginx)
- **Backend container**: Port 5000 (Node.js)
- **MongoDB container**: Port 27017
- **Kafka container**: Port 9092 (internal), 9093 (external)
- **Zookeeper container**: Port 2181

## Port Mapping Explanation

### Backend: `5001:5000`
- **5001** = External port (access from Mac browser/curl)
- **5000** = Internal port (inside container)
- Backend runs on port 5000 inside container
- Docker maps it to port 5001 on your Mac

### Frontend: `3001:80`
- **3001** = External port (access from Mac browser)
- **80** = Internal port (nginx inside container)
- Nginx runs on port 80 inside container
- Docker maps it to port 3001 on your Mac

## File Configuration Summary

### ✅ docker-compose.yml
```yaml
backend:
  ports:
    - "5001:5000"  # External:Internal
  environment:
    PORT: 5000     # Internal container port
    
frontend:
  ports:
    - "3001:80"    # External:Internal
  environment:
    REACT_APP_API_URL: http://localhost:5001  # External backend URL
```

### ✅ backend/.env
```env
PORT=5000  # Internal container port
```

### ✅ backend/server.js
```javascript
// CORS allows both Lab 1 and Lab 2 frontend ports
origin: ['http://localhost:3000', 'http://localhost:3001']

// Server listens on internal port
const PORT = process.env.PORT || 5000;
```

### ✅ frontend/nginx.conf
```nginx
# Proxy to backend using container name and internal port
location /api {
    proxy_pass http://backend:5000;  # Container name:Internal port
}
```

### ✅ frontend/.env
```env
REACT_APP_API_URL=http://localhost:5001  # External backend URL
```

### ✅ frontend/src/services/travelerApi.js
```javascript
// Uses environment variable, fallback to 5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

### ✅ frontend/src/services/ownerApi.js
```javascript
// Uses environment variable, fallback to 5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## Why Different Ports?

### Lab 1 vs Lab 2
- **Lab 1**: Uses ports 3000 (frontend) and 5000 (backend)
- **Lab 2**: Uses ports 3001 (frontend) and 5001 (backend)
- This allows both to run simultaneously without conflicts

## Container Communication

### Inside Docker Network
Containers talk to each other using:
- **Container names** (not localhost)
- **Internal ports** (not external mapped ports)

Example:
```
Frontend container → backend:5000 (NOT localhost:5001)
Backend container → mongodb:27017 (NOT localhost:27017)
Backend container → kafka:9092 (NOT localhost:9093)
```

### From Your Mac
You access services using:
- **localhost**
- **External mapped ports**

Example:
```
Browser → http://localhost:3001 (frontend)
Browser → http://localhost:5001 (backend)
Curl → curl http://localhost:5001/api/health
```

## Testing Ports

### Check if ports are in use
```bash
# Check backend port
lsof -i :5001

# Check frontend port
lsof -i :3001

# Check MongoDB port
lsof -i :27017

# Check Kafka port
lsof -i :9093
```

### Test connectivity
```bash
# Test backend health
curl http://localhost:5001/api/health

# Test frontend
curl http://localhost:3001

# Test MongoDB
mongosh mongodb://admin:admin123@localhost:27017/airbnb?authSource=admin
```

## Common Issues

### Issue: CORS Error
**Cause**: Backend CORS not allowing frontend origin
**Fix**: Ensure `backend/server.js` has:
```javascript
origin: ['http://localhost:3000', 'http://localhost:3001']
```

### Issue: Frontend can't reach backend
**Cause**: Wrong API URL in frontend
**Fix**: Ensure `docker-compose.yml` has:
```yaml
REACT_APP_API_URL: http://localhost:5001
```

### Issue: Nginx can't find backend
**Cause**: Wrong backend reference in nginx.conf
**Fix**: Use container name and internal port:
```nginx
proxy_pass http://backend:5000;  # NOT localhost:5001
```

### Issue: Port already in use
**Cause**: Another service using the port
**Fix**: 
```bash
# Find process
lsof -i :5001

# Kill process
kill -9 <PID>
```

## Summary

| Service    | External Port | Internal Port | Access URL                    |
|------------|---------------|---------------|-------------------------------|
| Frontend   | 3001          | 80            | http://localhost:3001         |
| Backend    | 5001          | 5000          | http://localhost:5001         |
| MongoDB    | 27017         | 27017         | mongodb://localhost:27017     |
| Kafka      | 9093          | 9092          | localhost:9093                |
| Zookeeper  | 2181          | 2181          | localhost:2181                |

**Remember**: 
- Use **external ports** when accessing from your Mac
- Use **internal ports** and **container names** for inter-container communication
