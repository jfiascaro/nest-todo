import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';

// El servicio tendrá las reglas de negocio que se usarán en los resolvers y controllers
@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      name: 'Diseñar el backend del proyecto',
      description: 'Realizar el diseño del backend',
      startDate: '2023-11-03T08:30:00.000Z',
      endDate: '2023-11-06T08:30:00.000Z',
      status: 'NEW',
      order: 1,
    },
    {
      id: 2,
      name: 'Construir el backend',
      description: 'Desarrollar el backend del proyecto',
      startDate: '2023-11-04T08:30:00.000Z',
      endDate: '2023-11-09T08:30:00.000Z',
      status: 'NEW',
      order: 2,
    },
    {
      id: 3,
      name: 'Tomar curso de Angular',
      description: 'Aprender Angular',
      startDate: '2023-11-05T08:30:00.000Z',
      endDate: '2023-11-10T08:30:00.000Z',
      status: 'DONE',
      order: 3,
    },
    {
      id: 4,
      name: 'Tomar curso sobre patrones',
      description: 'Aprender sobre patrones de diseño',
      startDate: '2023-11-06T08:30:00.000Z',
      endDate: '2023-11-09T08:30:00.000Z',
      status: 'INPROGRESS',
      order: 4,
    },
    {
      id: 5,
      name: 'Aplicar teoría de patrones',
      description: 'Aplicar patrones de diseño',
      startDate: '2023-11-07T08:30:00.000Z',
      endDate: '2023-11-10T08:30:00.000Z',
      status: 'NEW',
      order: 5,
    },
    {
      id: 6,
      name: 'Crear documentación',
      description: 'Generar documentación del proyecto',
      startDate: '2023-11-08T08:30:00.000Z',
      endDate: '2023-11-11T08:30:00.000Z',
      status: 'NEW',
      order: 6,
    },
    {
      id: 7,
      name: 'Levantar servidores',
      description: 'Configurar los servidores',
      startDate: '2023-11-09T08:30:00.000Z',
      endDate: '2023-11-12T08:30:00.000Z',
      status: 'DONE',
      order: 7,
    },
    {
      id: 8,
      name: 'Pagar publicidad del sistema',
      description: 'Realizar pagos de publicidad',
      startDate: '2023-11-10T08:30:00.000Z',
      endDate: '2023-11-13T08:30:00.000Z',
      status: 'DONE',
      order: 8,
    },
    {
      id: 9,
      name: 'Comenzar con el soporte a usuarios',
      description: 'Iniciar el soporte técnico',
      startDate: '2023-11-11T08:30:00.000Z',
      endDate: '2023-11-14T08:30:00.000Z',
      status: 'INPROGRESS',
      order: 9,
    },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.status === 'DONE').length;
  }

  get pendingTodos() {
    return this.todos.filter((todo) => todo.status === 'INPROGRESS').length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined)
      return this.todos.filter((todo) => todo.status === status);
    return this.todos;
  }

  // Solicita el Id de tipo number
  findOne(id: number): Todo {
    // Obtiene el todo a devolver por su ID
    const todo = this.todos.find((todo) => todo.id === id);
    // Si no encuentra el todo solicitado devuelve un NotFound
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    // Devuelve el todo solicitado
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.status = 'NEW';
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    this.todos.push(todo);
    return todo;
  }

  update(updateTodoInput: UpdateTodoInput) {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    //if (done !== undefined) todoToUpdate.status = done;

    this.todos = this.todos.map((todo) => {
      //return (todo.id === id) ? todoToUpdate : todo; (Es lo mismo que abajo pero con el operador ternario)

      if (todo.id === id) {
        return todoToUpdate;
      }
      return todo;
    });
    return todoToUpdate;
  }

  delete(id: number) {
    const todo = this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return true;
  }
}
