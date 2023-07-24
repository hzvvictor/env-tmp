type DotenvConfig = {
    [key: string]: string;
};
type Command = {
    command: string;
    args: string[];
    options?: import('child_process').SpawnOptions;
};
declare const setConfig: (obj: DotenvConfig, nameBackupTmp?: '') => void;
declare const revertConfig: () => void;
declare const executeWithTempDotenv: (obj: DotenvConfig, ...commands: Command[]) => Promise<void>;
declare const _default: {
    setConfig: (obj: DotenvConfig, nameBackupTmp?: "" | undefined) => void;
    revertConfig: () => void;
    executeWithTempDotenv: (obj: DotenvConfig, ...commands: Command[]) => Promise<void>;
};
export default _default;
export { setConfig, revertConfig, executeWithTempDotenv };
