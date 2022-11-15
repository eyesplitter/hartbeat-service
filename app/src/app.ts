import express from 'express'
import 'express-async-errors'
import { groupSummaryRouter } from './routers/groupSummary'
import { groupCreateRouter } from './routers/groupCreate'
import { groupDeleteRouter } from './routers/groupDelete'
import { groupShowRouter } from './routers/groupShow'
import { errorHandler } from './errors/errorHandler'
import { NotFoundError } from './errors/notFoundError'

const app = express()
app.use(express.json())
app.use(groupSummaryRouter)
app.use(groupCreateRouter)
app.use(groupDeleteRouter)
app.use(groupShowRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
