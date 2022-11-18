# Verzel Test

A technical test for Verzel. It's an app that list cars and when logged with Admin you can CRUD.

## Techs

**Front:** React Native, Expo

**Back:** Express, Prisma, SQLite

## Important Observations

### Database

I used the SQLite database so you need just install the project dependencies and it's done.

### Login

The credentials to admin user are:

User: admin
Password: 123

### API Address

If you will run the app on your smartphone, you need to change the API URL on the baseUrl.ts file located at mobile/utils/baseUrl.ts and put the IP address of your computer that the API is running.

Example: http://192.168.20:3333

If you will run the app on the emulator, you don't need to change the file and the address will be http://localhost:3333

### Password

Obviously, it's a security problem save the user password without cryptography. But, this project is simple and I didn't put it.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`JWT_SECRET=TesteDeSegredo`

## Run Locally

Clone the project

```bash
  git clone https://github.com/Murilo-V/verzel-test
```

Go to the project directory

```bash
  cd verzel-test
```

Go to the back-end directory

```bash
  cd api
```

Install back-end dependencies

```bash
  yarn install
```

Start the api

```bash
  yarn dev
```

Go to the front-end directory

```bash
  cd ../mobile
```

Install front-end dependencies

```bash
  yarn install
```

Start the app

```bash
  yarn start
```
