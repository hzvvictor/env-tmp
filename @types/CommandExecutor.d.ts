/// <reference types="node" />
import { SpawnOptions } from 'child_process';
declare class CommandExecutor {
    private strict;
    constructor(strict?: boolean);
    private executeCommand;
    executeCommands(commands: Array<{
        command: string;
        args: string[];
        options?: SpawnOptions;
    }>): Promise<void>;
}
export default CommandExecutor;
