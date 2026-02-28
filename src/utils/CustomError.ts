export default class CustomError extends Error {
  constructor(message: string) {
    super(message); // mensagem padrão do Error
    this.name = "CustomError";

    // Corrige o prototype para instanceof funcionar
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
