
<h1 align="center">
  Payment Service Provider 
</h1>

## How to run locally?

1 - Clone on your local machine

```bash
git clone https://github.com/joaoreider/payment-service-provider-demo.git
```

2 - Navigate to project directory

```bash
cd payment-service-provider-demo

```


3 - Rename .env.example to .env

```bash
mv .env.example .env
```

4 - Run:

```bash
docker-compose up --build
```

## Documentation
- Access `http://localhost:3000/documentation`

## How to run tests?

1 - Unit tests

```bash
npm run test
```

2 - End to end tests
```bash
npm run test:e2e
```



