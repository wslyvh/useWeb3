docker build --build-arg BUILD_VERSION=0.0.1 -t useWeb3 .
docker run --name useWeb3  -p 5000:5000 -v /data:/data -d useWeb3:latest --build-args BUILD_VERSION=0.0.1
