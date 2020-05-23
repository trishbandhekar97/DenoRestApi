import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { User } from '../models/Users.ts'

let users: User[] = [
  {
    id: '1',
    name: 'Adam',
    email: 'adam@gmail.com',
    salary: 20000,
  },
  {
    id: '2',
    name: 'Alice',
    email: 'alice@gmail.com',
    salary: 30000,
  },
  {
    id: '3',
    name: 'Bob',
    email: 'bob@gmail.com',
    salary: 25000,
  },
  {
    id: '4',
    name: 'Charlie',
    email: 'charlie@gmail.com',
    salary: 27500,
  },
  {
    id: '5',
    name: 'David',
    email: 'david@gmail.com',
    salary: 21540,
  },
]

const getUsers = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: users,
  }
}

const getUser = ({
  params,
  response,
}: {
  params: { id: string }
  response: any
}) => {
  const user: User | undefined = users.find((u) => u.id === params.id)

  if (user) {
    response.status = 200
    response.body = {
      success: true,
      data: user,
    }
  } else {
    response.status = 404
    response.body = {
      success: false,
      data: {},
    }
  }
}

const addUser = async ({
  request,
  response,
}: {
  request: any
  response: any
}) => {
  const body = await request.body()

  if (!request.hasBody) {
    response.status = 400
    response.body = {
      status: false,
      message: {},
    }
  } else {
    const user: User = body.value
    user.id = v4.generate()
    users.push(user)
    response.status = 201
    response.body = {
      status: true,
      message: user,
    }
  }
}

const updateUser = async ({
  params,
  request,
  response,
}: {
  params: { id: string }
  request: any
  response: any
}) => {
  const user: User | undefined = users.find((u) => u.id == params.id)

  if (user) {
    const body = await request.body()

    const updatedData: { name?: string; email?: string; salary?: number } =
      body.value

    users = users.map((u) =>
      u.id === params.id ? { ...u, ...updatedData } : u
    )

    response.status = 200
    response.body = {
      status: true,
      message: users,
    }
  } else {
    response.status = 404
    response.body = {
      status: false,
      message: 'No User found',
    }
  }
}

const deleteUser = ({
  params,
  response,
}: {
  params: { id: string }
  response: any
}) => {
  users = users.filter((u) => u.id !== params.id)
  response.body = {
    status: true,
    message: 'User deleted',
  }
}

export { getUsers, getUser, addUser, updateUser, deleteUser }
