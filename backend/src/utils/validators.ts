import {body, ValidationChain, validationResult} from "express-validator"
import { NextFunction, Request, Response } from "express";
const validate = (validations: ValidationChain[]) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        for (let validation of validations){
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req)
        if(errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({errors: errors.array()})
    };
}

const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").isLength({ min: 6}).trim().withMessage("Password should contain atleast 6 characters"),
]

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator
];

const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message iss required"),
    ...loginValidator
];

export {signupValidator, validate, loginValidator, chatCompletionValidator}