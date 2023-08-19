import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';

// El servicio tendrá las reglas de negocio que se usarán en los resolvers y controllers
@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Completar el curso de NestJS', done: true },
    { id: 2, description: 'Diseñar el backend del proyecto', done: true },
    { id: 3, description: 'Construir el backend', done: true },
    { id: 4, description: 'Tomar curso de Angular', done: false },
    { id: 5, description: 'Tomar curso sobre patrones', done: false },
    { id: 6, description: 'Aplicar teoría de patrones', done: false },
    { id: 7, description: 'Crear documentación', done: false },
    { id: 8, description: 'Levantar servidores', done: false },
    { id: 9, description: 'Pagar publicidad del sistema', done: false },
    { id: 10, description: 'Comenzar con el soporte a usuarios', done: false },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((todo) => todo.done === true).length;
  }

  get pendingTodos() {
    return this.todos.filter((todo) => todo.done === false).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);
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
    todo.done = false;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    this.todos.push(todo);
    return todo;
  }

  update(updateTodoInput: UpdateTodoInput) {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

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
