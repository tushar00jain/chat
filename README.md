# Chat Analytics

## Production
```
docker-compose up -d
docker logs -f --tail=100 app
```

## Development
```
docker-compose up -d db
docker-compose run --service-ports app
npm run start
```

## Demo
![](https://giphy.com/gifs/26BGCVHRvstqHUtzy)