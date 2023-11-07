export class CreateUserDto {
  firstname: string;

  lastname: string;
}

export function isString(data: any): boolean {
  return typeof data === 'string';
}

export function validUser(input: CreateUserDto): void {
  if (!isString(input.firstname) || !isString(input.lastname)) {
    throw new Error('User not valid');
  }
}
