import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate'
const schema = new Schema({
    firstName: {
        type: String,
        required: 'Student First Name is required.'
    },
    lastName: {
        type: String,
        required: 'Student Last Name is required.'
    },
    class: {
        type: String,
        required: 'Student Class is required.'
    },
    subjectsId: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    }
}, { timestamps: true });

schema.index({ firstName: 1, lastName: 1 }, function (err, result) {
    if (err) console.log(`getting error to create index in student Model`)
    else console.log(`Indexing created for email Field in student Model.`)
})

schema.plugin(mongoosePaginate);
const student = model('student', schema);
export default student;