const regexTitle = /[a-zA-Z0-9]/gi

export default function validation(receta) {
    var errors = {}
    
    if (receta.title.length <= 5 || receta.title.length >= 255) errors.title = 'El título debe contener entre 5 y 255 caracteres'
    if (!regexTitle.test(receta.title)) errors.title = 'El título no puede contener caracteres especiales'
    if (!receta.title) errors.title = 'El título no puede estar en blanco'

    if (receta.image.length > 255) errors.image = 'El link de la imagen debe contener hasta 255 caracteres'

    if (receta.healthScore < 1 || receta.healthScore > 100) errors.healthScore = 'El HealthScore debe tener un valor entre 1 y 100'

    if (receta.summary.length <= 10 || receta.summary.length >= 800) errors.summary = 'El resumen debe contener entre 10 y 800 caracteres'

    if (receta.instructions.length <= 10 || receta.instructions.length >= 800) errors.instructions = 'Las instrucciones deben contener entre 10 y 800 caracteres'

    if (!receta.diets) errors.diets = 'Debe elegir al menos un tipo de dieta'

    return errors
}