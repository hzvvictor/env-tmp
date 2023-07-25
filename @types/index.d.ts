type DotenvConfig = {
    [key: string]: string;
};
type Command = string;
declare const setShowLogs: (showLogs?: boolean) => boolean;
declare const setConfig: (obj: DotenvConfig, nameBackupTmp?: string) => void;
declare const revertConfig: (nameBackupTmp?: string) => Promise<"restore" | undefined>;
declare const executeWithTempDotenv: (obj: DotenvConfig, ...commands: Command[]) => Promise<void>;
declare const _default: {
    setShowLogs: (showLogs?: boolean) => boolean;
    setConfig: (obj: DotenvConfig, nameBackupTmp?: string) => void;
    revertConfig: (nameBackupTmp?: string) => Promise<"restore" | undefined>;
    executeWithTempDotenv: (obj: DotenvConfig, ...commands: string[]) => Promise<void>;
};
export default _default;
export { setShowLogs, setConfig, revertConfig, executeWithTempDotenv };
