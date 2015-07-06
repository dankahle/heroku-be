#heroku-be
#### A common backend for all projects

I get one free node app from heroku and one free database from mongolab. The deal is to *share* these between all projects. There's only one heroku port, so can't run a server for each project, so all server code will be shared and the package.json node modules a union of all aggregated projects. This could be limiting under web application scenarios, but when simply presenting a rest api, shouldn't be an issue.

Each project will have a project router that handles "/projectName" route, and specific routers inside that for its own needs. Only thing that affects the server code is the app.use('/projectName', projectRouter) line. Everything else is encapsulated in the specific project files.

Each project creates its own connections to mongodb. There may be a limit to how many concurrent connections are allowed to mongo, if so, I may need to find a way to share between projects. 

The other side of the coin are the frontends. They will run as static websites under github.io gh-pages branches. This affords free frontend serving as well :). The front and backend projects will run independently locally, then be ported to gh-pages/heroku-be when complete for public consumption.

#### Proof of concept
I use 2 frontend projects: heroku1-fe, heroku2-fe
and 2 backend projects: heroku1-be, heroku2-be to prove the concept. The frontends have a gulpfile that produces a dist directory which I orphan branch into gh-pages. For the backends, I simply grab their src directories sans index.js and place it into the heroku-be project then redeploy to heroku.

**frontends**  
[heroku1-fe](https://github.com/dankahle/heroku1-fe)  
[heroku2-fe](https://github.com/dankahle/heroku2-fe)

**backends**  
[heroku1-be](https://github.com/dankahle/heroku1-be)  
[heroku2-be](https://github.com/dankahle/heroku2-be)

**view this running**  
[heroku1-fe](https://dankahle.github.io/heroku1-fe)  
[heroku2-fe](https://dankahle.github.io/heroku2-fe)




