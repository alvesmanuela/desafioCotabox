import { BadRequestError } from "../errors/bad-request.error.js";

export function validateTransaction(request, response, next) {

    const name = request.body.name;
    if (!name) {
        return response.status(400).json(new BadRequestError("Nome nao informado"));
    }
    const lastname = request.body.lastname;
    if (!lastname) {
        return response.status(400).json(new BadRequestError("Sobrenome nao informado"));
    }

    const part = request.body.part;
    if (!part) {
        return response.status(400).json(new BadRequestError("Participação nao informado"));
    }

    next();
}