# Chat Analytics
This is a real time chat application that also provides data analytics on the chat content.
This application uses ```MongoDB``` and ```Node.js``` for the backend and ```React.js``` and ```d3.js``` on the client.
You only need docker installed on your computer to run this application.

## Instructions
  - Run the commands for the development or production version provided below
  - Open 2 tabs at ```localhost:3000``` 
  - Open 1 tab at ```localhost:3000/analytics```

## Production
```
docker-compose up -d
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
![](http://i.giphy.com/26BGCVHRvstqHUtzy.gif)
