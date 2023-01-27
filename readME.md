typeorm migration:create ./src/db/migrations/userTable


docker run -p 3001:3001 -d tsandaru/nodejs-cicd-1 
docker login -u "myusername" -p "mypassword" docker.io
docker push tsandaru/node-cicd-1  