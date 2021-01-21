import { model, Schema } from 'mongoose';

const schema = new Schema({
    subjects: [{
        name: { type: String },
        marks: { type: Number }
    }]
}, { timestamps: true }, { _id: false });

const subject = model('subject', schema);
export default subject;