import { Mongo } from "meteor/mongo";


export const ActivitiesCollection = new Mongo.Collection('activities', {
    idGeneration: "MONGO",
});

export const PayrollHistory = new Mongo.Collection('payroll_history', {
    idGeneration: "MONGO",
})


export const FeedbackCOllection = new Mongo.Collection('feedback', {
    idGeneration: "MONGO",
})

