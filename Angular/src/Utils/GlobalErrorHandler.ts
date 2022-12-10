

export function mostrarError(component: any, error: any): void {
    const originalError = error.error ?? error
    let errorMessage = originalError.message
    if (error.status === 0) {
      errorMessage = 'No hay conexión con el backend'
    } else if (error.status === 500) {
      errorMessage = 'Hubo un error al realizar la operación'
      console.error(error)
    }
    component.errors.push(errorMessage)
    setTimeout(() => {
      component.errors.length = 0
    }, 5000)
  }