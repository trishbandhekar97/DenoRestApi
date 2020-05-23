import { Router } from 'https://deno.land/x/oak/mod.ts'
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from '../controllers/users.ts'

const router = new Router()

router
  .get('/api/v1/users', getUsers)
  .get('/api/v1/user/:id', getUser)
  .post('/api/v1/users', addUser)
  .put('/api/v1/user/:id', updateUser)
  .delete('/api/v1/user/:id', deleteUser)

export default router
