import mongoose,{Schema} from 'mongoose'

const dataSchema = new Schema({
    number: { type: Number, required: true },
    mod350: { type: Number, required: true },
    mod8000: { type: Number, required: true },
    mod20002: { type: Number, required: true },
})

export const Data = mongoose.model("Data",dataSchema )