export function slug(str: string) {
    return str.normalize('NFD')
        .trim().toLowerCase()
        .replace(/a-zA-Z0-9_.-+/g, '')
        .replace(/_/g, '')
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
}