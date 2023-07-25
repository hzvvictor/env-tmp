declare class CommandExecutor {
    private commands;
    private cwd;
    constructor({ commands, cwd }: {
        commands: string[];
        cwd?: string;
    });
    private findCommandPath;
    executeCommands(): Promise<void>;
    private executeCommand;
    private getSpawnOptions;
}
export default CommandExecutor;
