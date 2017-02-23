# Chat Analytics
This is a real time chat application that also provides data analytics on the chat content.
This application uses ```MongoDB``` and ```Node.js``` for the backend and ```React.js``` and ```d3.js``` on the client.
You only need docker installed on your computer to run this application.
The client will need to enter a username to access the chat. Afterwards, the conversation among all the clients will be saved to mongoDB.

## Instructions
  - Run the commands for the development or production version provided below
  - Open 2 tabs at ```localhost:3000``` 
  - Open 1 tab at ```localhost:3000/analytics```

## Production
```
docker-compose up -d db
docker-compose up -d app
docker logs -f --tail=100 app
```

## Development
```
docker-compose -f docker-compose-dev.yml up -d db
docker-compose -f docker-compose-dev.yml run --service-ports app
```
Inside the container run:
```
npm run start
```

## Routes
  - ```localhost:3000```            chat application window
  - ```localhost:3000/analytics```  chat analytics window

## Demo
![](http://i.giphy.com/l44Qw2um6tqoVC9TG.gif)


## Local Deployment (under development)
```
sudo sh -c  "echo '127.0.0.1 chat.com' >> /etc/hosts"
docker-compose -f docker-compose-deploy.yml up -d db
docker-compose -f docker-compose-deploy.yml up -d app
docker-compose -f docker-compose-deploy.yml up -d nginx-proxy
```
