"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const instructor_routes_1 = __importDefault(require("./routes/instructor.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const { initializeSocket } = require('./socket.js');
const http_1 = require("http");
require("dotenv/config");
const app = (0, express_1.default)();
const url = process.env.MONGO_URL1;
const server = (0, http_1.createServer)(app);
// Middleware
app.use((0, express_session_1.default)({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/instructor', instructor_routes_1.default);
app.use('/api/student', student_routes_1.default);
app.use('/api/chat', chat_routes_1.default);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized' });
    }
});
mongoose_1.default.connect(`${url}`).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('MongoDB connection error:', error);
});
//socket server
initializeSocket(server);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
