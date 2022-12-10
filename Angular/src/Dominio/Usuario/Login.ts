export class ValidationMessage {
    constructor(public field: string, public message: string) {}
  }

export class Login{

    userName:string = ""
    password:string = ""
    errors:ValidationMessage[] = []


    constructor() {

    }

    hasErrors(field: string): boolean {
        return this.errors.some((error) => error.field == field)
    }
    
    errorsFrom(field: string) {
        return this.errors.filter((error) => error.field == field).map((error) => error.message).join(". ")
    }

    addError(field: string, message: string) {
        this.errors.push(new ValidationMessage(field, message))
      }

    reviewLogin(){
        this.errors.length = 0
        if(this.userName == ""){
            this.addError("userName","Debe ingresar un usuario")
        }else{
            if(this.password == ""){
                this.addError("password","Debe ingresar una contraseña")
            }
        }
    }

    tryLogin():boolean{
        this.reviewLogin()
        if(this.errors.length == 0){
            return true
        }
        return false
    }

}