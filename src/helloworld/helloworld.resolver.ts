import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
  @Query(() => String, {
    name: 'Hello',
    description: 'Retorna un Hola Mundo',
  })
  helloworld(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Devuelve un número random',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'Devuelve un número random del 0 al número indicado',
  })
  getRandomFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) to: number = 10,
  ): number {
    return Math.floor(Math.random() * to) + 1;
  }
}
