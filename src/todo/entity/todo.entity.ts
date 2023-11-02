import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() //Indica que es un tipo de objeto personalizado de GraphQL
export class Todo {
  @Field(() => Int) //Indica que tipo de campo de GraphQL es el campo ID (Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field() // Usa GraphQLISODateTime en lugar de Date
  startDate: string; // Cambia el tipo de startDate a string

  @Field() // Usa GraphQLISODateTime en lugar de Date
  endDate: string; // Cambia el tipo de endDate a string

  @Field(() => String) //String en mayúsculas
  description: string;

  @Field(() => Boolean) //Boolean en mayúsculas
  status: boolean = false;

  @Field(() => Int)
  order: number;
}
