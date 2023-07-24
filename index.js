"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeWithTempDotenv = exports.revertConfig = exports.setConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const VARIABLES = dotenv_1.default.config().parsed || {};
const fs_1 = __importDefault(require("fs"));
const CommandExecutor_1 = __importDefault(require("./CommandExecutor"));
const dirTmp = { exist: false };
const deleteFile = (filePath) => {
    fs_1.default.unlink(filePath, (error) => {
        if (error)
            throw `Error deleting the file: ${error.message}`;
    });
};
const moveFile = (sourcePath, destinationPath) => (fs_1.default.rename(sourcePath, destinationPath, (error) => {
    if (error)
        throw `Error moving the file: ${error.message}`;
}));
const deleteEmptyDirectory = (directoryPath) => {
    fs_1.default.readdir(directoryPath, (error, files) => {
        if (error)
            return;
        if (files.length !== 0)
            return;
        fs_1.default.rmdir(directoryPath, (error) => {
            if (error)
                throw `Error deleting the directory: ${error.message}`;
        });
    });
};
const generateEnvText = (obj) => {
    const keysParams = Object.keys(obj);
    for (const keyParams of keysParams) {
        VARIABLES[keyParams] = obj[keyParams];
    }
    const keys = Object.keys(VARIABLES);
    const envText = keys.reduce((acc, key) => (acc += `${key}=${VARIABLES[key]}\n`), '');
    return envText;
};
const verifyPath = (nameBackupTmp) => {
    const path = './tmp';
    dirTmp.exist = fs_1.default.existsSync(path);
    if (!dirTmp.exist)
        fs_1.default.mkdirSync(path);
    if (fs_1.default.existsSync(`${path}/${nameBackupTmp}`))
        throw `Already exists '.env' in '${path}/${nameBackupTmp}'`;
    return true;
};
const setConfig = (obj, nameBackupTmp) => {
    const fileName = nameBackupTmp || '.env';
    verifyPath(fileName);
    moveFile('.env', './tmp/.env');
    const envText = generateEnvText(obj);
    fs_1.default.writeFileSync('.env', envText);
    console.log('\x1b[90mEnvironment variables backed up successfully. ✔');
};
exports.setConfig = setConfig;
const revertConfig = () => {
    const existEnv = fs_1.default.existsSync('.env');
    const existEnvTmp = fs_1.default.existsSync('./tmp/.env');
    if (!existEnvTmp)
        throw `File './tmp/.env' not found`;
    moveFile('./tmp/.env', '.env');
    deleteEmptyDirectory('./tmp');
    console.log('\x1b[90mEnvironment variables restored successfully. \x1b[0m\x1b[32m✔\x1b[0m');
};
exports.revertConfig = revertConfig;
const executeWithTempDotenv = (obj, ...commands) => __awaiter(void 0, void 0, void 0, function* () {
    setConfig(obj);
    const executor = new CommandExecutor_1.default(true);
    yield executor.executeCommands(commands);
    revertConfig();
});
exports.executeWithTempDotenv = executeWithTempDotenv;
exports.default = {
    setConfig,
    revertConfig,
    executeWithTempDotenv
};
