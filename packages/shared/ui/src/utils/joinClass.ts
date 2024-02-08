export const joinClass = (args: Array<string | null | undefined>) => {
    return args.filter((arg) => !!arg).join(' ');
};