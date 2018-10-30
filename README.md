# Codevember 2018

My codevember contribution for 2018.

## Getting started

### Prerequisites
* Node.js ~> 8.1.3
* Yarn ~>

### Setup
`make deps`: Install/Update dependencies 

### Serve
`make`: Serve latest `./src/*.js` with livereload on [localhost:9966](http://localhost:9966)

### Build
`make build`: Build every `./src/*.js` to `dist/`

### Deploy
First you need to create a `.env` file at the root of the repo:

```bash
USER:=user
SERVER:=server
SERVER_DEST:=server_dest
```

Then you can run the following command to build and deploy `./dist` to [codevember.davidauthier.wearemd.com/2018/11/](https://codevember.davidauthier.wearemd.com/2018/11/) :

```bash
make deploy
``` 
