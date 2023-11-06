const Problem = require('../data/Problem');

const getAllProblems = async (req, res) => {
    const problems = await Problem.find();
    if (!problems) return res.status(204).json({ 'message': 'No problems found.' });
    res.json(problems);
}

const createNewProblem = async (req, res) => {
    if (!req?.body?.title || !req?.body?.body || !req?.body?.inputspec || !req?.body?.outputspec || !req?.body?.sampleinput || !req?.body?.sampleoutput || !req?.body?.input || !req?.body?.answer || !req?.body?.author || req?.body?.rating === undefined) {
        return res.status(400).json({ 'message': 'Problem data incomplete' });
    }
    try {
        const result = await Problem.create({
            title: req.body.title,
            body: req.body.body,
            inputspec: req.body.inputspec,
            outputspec: req.body.outputspec,
            sampleinput: req.body.sampleinput,
            sampleoutput: req.body.sampleoutput,
            input: req.body.input,
            answer: req.body.answer,
            author: req.body.author,
            rating: req.body.rating
        });
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

const updateProblem = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const problem = await Problem.findOne({_id: req.body.id}).exec();

    if (!problem) return res.status(400).json({ "message": `Problem with ID ${req.body.id} was not found` });

    if (req.body.title) problem.title = req.body.title;
    if (req.body.body) problem.body = req.body.body;
    if (req.body.inputspec) problem.inputspec = req.body.inputspec;
    if (req.body.outputspec) problem.outputspec = req.body.outputspec;
    if (req.body.sampleinput) problem.sampleinput = req.body.sampleinput;
    if (req.body.sampleoutput) problem.sampleoutput = req.body.sampleoutput;
    if (req.body.input) problem.input = req.body.input;
    if (req.body.answer) problem.answer = req.body.answer;
    if (req.body.author) problem.author = req.body.author;
    if (req.body.rating) problem.rating = req.body.rating;

    const result = await problem.save();
    res.json(result);
}

const deleteProblem = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const problem = await Problem.findOne({_id: req.body.id}).exec();

    if (!problem) return res.status(400).json({ "message": `Problem with ID ${req.body.id} was not found` });

    const result = await problem.deleteOne();
    res.json(result);
}

const getProblembyID = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    const problem = await Problem.findOne({id: req.params.id}).exec();

    if (!problem) return res.status(400).json({ "message": `Problem with ID ${req.params.id} was not found` });
    
    res.json(problem);
}

module.exports = {
    getAllProblems,
    createNewProblem,
    updateProblem,
    deleteProblem,
    getProblembyID
}