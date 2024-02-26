import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'
import morgan from 'morgan'
import path from 'path'
import favicon from 'serve-favicon'
import routes from './routes'

const isProduction = process.env.NODE_ENV === 'production'
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(express.static(__dirname + '../public'))
app.use(favicon(path.join(__dirname, '../public', 'favicon.png')))

require('config/passport')

// Routing
app.use(routes)

/// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found')
  next(err)
})

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  })
})

// finally, let's start our server...
app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on http://localhost:3000')
})
