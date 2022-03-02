docker build --build-arg BUILD_VERSION=0.0.1 -t useweb3 .
docker run --name useweb3  -p 5000:5000 -v /data:/data -d useweb3:latest --build-args BUILD_VERSION=0.0.1
