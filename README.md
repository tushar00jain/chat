# Chat Analytics

## Instructions
  - Run the commands for the development version
  - Open 2 tabs at ```localhost:3000``` 
  - Open 1 tab at ```localhost:3000/analytics```

## Production
```
docker-compose up -d
docker logs -f --tail=100 app
```

## Development
```
docker-compose up -d db
docker-compose run --service-ports app
```
Inside the container run:
```
npm install
npm run start
```

## Routes
  - ```localhost:3000```            chat application window
  - ```localhost:3000/analytics```  chat analytics window

## Demo
![](http://i.giphy.com/26BGCVHRvstqHUtzy.gif)
