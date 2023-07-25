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
const child_process_1 = require("child_process");
const which_1 = __importDefault(require("which"));
class CommandExecutor {
    constructor({ commands, cwd = process.cwd() }) {
        this.commands = commands;
        this.cwd = cwd;
    }
    findCommandPath(command) {
        return (0, which_1.default)(command);
    }
    executeCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const command of this.commands) {
                const splitCommand = command.split(/\s+/g);
                const commandPath = yield this.findCommandPath(splitCommand[0]);
                yield this.executeCommand(commandPath, splitCommand.slice(1));
            }
        });
    }
    executeCommand(commandPath, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const childProcess = (0, child_process_1.spawn)(commandPath, args, this.getSpawnOptions());
                childProcess.on('error', (error) => {
                    reject(`Error executing command: ${error.message}`);
                });
                childProcess.on('exit', (code) => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(`Command execution failed with exit code: ${code}`);
                    }
                });
            });
        });
    }
    getSpawnOptions() {
        return { cwd: this.cwd, stdio: 'inherit' };
    }
}
exports.default = CommandExecutor;
