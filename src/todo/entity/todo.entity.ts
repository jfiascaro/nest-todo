import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() //Indica que es un tipo de objeto personalizado de GraphQL
export class Todo {
  @Field(() => Int) //Indica que tipo de campo de GraphQL es el campo ID (Int)
  id: number;

  @Field(() => String) //String en mayúsculas
  description: string;

  @Field(() => Boolean) //Boolean en mayúsculas
  done: boolean = false;
}
