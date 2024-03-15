module.exports = (app) => {
    require('./auth')(app)
    require('./todoItem')(app)
    require('./todoList')(app)
}