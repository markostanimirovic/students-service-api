module.exports = (req, res) => {
    res.status(404).json({
        type: 'error',
        message: 'Not Found'
    });
};