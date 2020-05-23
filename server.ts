import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes/routes.ts'
const port = 8000

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Server running on Port: ${port}`)

await app.listen({ port })
