import { response } from '../common';
import studentModel from '../model/student';
import subjectModel from '../model/subject';

export const add = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.class || !req.body.subjects || req.body.subjects.length == 0) return response(res, 400, 'Bad Request')
    try {
        let result = await new subjectModel({ subjects: req.body.subjects }).save()
        await new studentModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            class: req.body.class,
            subjectsId: result._id
        }).save()
        return response(res, 200, 'OK')
    }
    catch (e) {
        return response(res, 500, e)
    }
}

export const get = async (req, res) => {
    try {
        let resPerPage = 10; // results per page
        let page = JSON.parse(req.query.page) || 1;
        let result = await studentModel.find({}, { firstName: 1, lastName: 1, class: 1, subjectsId: 1 })
            .skip((resPerPage * page) - resPerPage).limit(resPerPage)
            .populate({
                path: 'subjectsId',

            })
        // Count how many Order were found
        let total = await studentModel.countDocuments({});
        return response(res, 200, { docs: result, currentPage: page, pages: Math.ceil(total / resPerPage), total: total })
    }
    catch (e) {
        console.log(e)
        return response(res, 500, e)
    }
}

/* 
@{params} pass _id as student_id to delete the student
*/
export const update = async (req, res) => {
    if (!req.params.student_id) return response(res, 400, 'Bad Request')
    try {
        var obj = {}
        if (req.body.firstName) obj.firstName = req.body.firstName
        if (req.body.lastName) obj.lastName = req.body.lastName
        if (req.body.class) obj.class = req.body.class
        await studentModel.findByIdAndUpdate(req.params.student_id, obj, { new: true })
        if (req.body.subjectName && req.body.marks && req.body.subject_id) {
            await subjectModel.findOneAndUpdate(
                { _id: req.body.subject_id, 'subjects.name': req.body.subjectName },
                { $set: { 'subjects.$.marks': req.body.marks } },
                { new: true }
            )
        }
        return response(res, 200, 'OK')
    }
    catch (e) {
        return response(res, 500, e)
    }
}

/* 
@{params} pass _id as student_id to delete the student
*/
export const remove = async (req, res) => {
    if (!req.params.student_id) return response(res, 400, 'Bad Request')
    try {
        await studentModel.deleteOne({ _id: req.params.student_id })
        return response(res, 200, 'Deleted')
    }
    catch (e) {
        return response(res, 500, e)
    }
}