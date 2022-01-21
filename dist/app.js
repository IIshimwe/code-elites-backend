"use strict";

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _mongoose = require("mongoose");

var _express = _interopRequireWildcard(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

Promise.resolve().then(() => _interopRequireWildcard(require('dotenv/config')));
const app = (0, _express.default)();
(0, _mongoose.connect)('mongodb://localhost/capstone').then(() => console.log('Connected to mongoDB')).catch(err => console.error('Could not connect to MongoDBNamespace...', err));
app.use((0, _express.json)());
app.use('/api/users', _users.default);
app.use('/api/auth', _auth.default);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port: ${port}...`));