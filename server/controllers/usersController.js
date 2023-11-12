const User = require('../data/User');

const eloCalculation = (Ra, Rb, Sa) => {
    const K = 64;
    const c = 600;
    const Qa = 10 ** (Ra / c);
    const Qb = 10 ** (Rb / c);
    const Ea = Qa / (Qa + Qb);
    const change = K * (Sa - Ea);
    return Math.round(change);
}

const getAllUsers = async (req, res) => {
    const users = await User.find().select('username');
    if (!users) return res.status(204).json({ 'message': 'No users found.' });
    res.json(users);
}

const getUserByUsername = async (req, res) => {
    if (!req?.params?.username) {
        return res.status(400).json({ 'message': 'Username parameter is required.' });
    }
    const user = await User.findOne({ username: req.params.username }).exec();

    if (!user) return res.status(400).json({ "message": `User with username ${req.params.username} was not found` });

    res.json(user);
}

const updateRating = async (req, res) => {
    const { win, lose } = req.body;
    if (!win || !lose) {
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
    const winner = await User.findOne({ username: win }).exec();
    const loser = await User.findOne({ username: lose }).exec();
    console.log(JSON.stringify(winner));
    console.log(JSON.stringify(loser));

    if (!winner || !loser) return res.status(400).json({ "message": `Winner or Loser not found!` });

    const winnerChange = eloCalculation(winner.rating, loser.rating, 1);
    const loserChange = eloCalculation(loser.rating, winner.rating, 0);
    winner.rating = winner.rating + winnerChange;
    loser.rating = loser.rating + loserChange;

    await winner.save();
    await loser.save();

    res.json({ 'winner': winnerChange, 'loser': loserChange });
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    updateRating
}