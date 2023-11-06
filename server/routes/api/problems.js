const express = require('express');
const router = express.Router();
const problemsController = require('../../controllers/problemsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(problemsController.getAllProblems)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), problemsController.createNewProblem)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), problemsController.updateProblem)
    .delete(verifyRoles(ROLES_LIST.Admin,), problemsController.deleteProblem);

router.route('/:id')
    .get(problemsController.getProblembyID);

module.exports = router;