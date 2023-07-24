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
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class CommandExecutor {
    constructor(strict = false) {
        this.strict = strict;
    }
    executeCommand(command, args, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                console.log('  Executing command:', command, args);
                const childProcess = (0, child_process_1.spawn)(command, args, Object.assign({ stdio: 'inherit' }, options));
                childProcess.on('error', (error) => {
                    reject(new Error(`Error executing command ${command}: ${error.message}`));
                });
                childProcess.on('exit', (code) => {
                    if (code === 0) {
                        // console.log(`Command ${command} executed successfully`);
                        resolve();
                    }
                    else {
                        reject(new Error(`Error executing command ${command}. Exit code: ${code}`));
                    }
                });
            });
        });
    }
    executeCommands(commands) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const { command, args, options } of commands) {
                yield this.executeCommand(command, args, options).catch((error) => {
                    console.error(error.message);
                    if (this.strict) {
                        process.exit(1);
                    }
                });
            }
        });
    }
}
exports.default = CommandExecutor;
