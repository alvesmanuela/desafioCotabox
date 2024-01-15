import { BadRequestError } from "../../errors/bad-request.error.js";
import { validateTransaction } from "../transaction.validator.js"

//testando erro de requisição incorreta
describe('Create transaction validator', () => {

    let request;
    let response;

    beforeEach(() => {
        request = {
            body: {
                name: "anyName",
                lastname: "anyLastname",
                part: "anyPart"
            }
        };
        response = new ResponseMock();
    })

    describe('given name', () => {

        describe('when not informed', () => {

            beforeEach(() => {
                request.body.name = "anyName";
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);

                expect(response._status).toEqual(400);
            })

            test('then return error', () => {
                validateTransaction(request, response);

                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })


        describe('given lastname not informed', () => {

            beforeEach(() => {
                request.body.lastname = "anyLastname";
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);

                expect(response._status).toEqual(400);
            })

            test('then return error', () => {
                validateTransaction(request, response);

                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })



        describe('given part not informed', () => {

            beforeEach(() => {
                request.body.part = "anyPart";
            })

            test('then return 400 error', () => {
                validateTransaction(request, response);

                expect(response._status).toEqual(400);
            })

            test('then return error', () => {
                validateTransaction(request, response);

                expect(response._json).toBeInstanceOf(BadRequestError);
            })

        })

    })

    class ResponseMock {
        _json;
        _status;
        json(value) {
            this._json = value;
        }
        status(value) {
            this._status = value;
            return this;
        }
    }

})