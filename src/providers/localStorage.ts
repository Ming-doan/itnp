class LocalStorageService {
    read(key: string, defaultValue?: object | string): object | string {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    }

    createOrUpdate(key: string, value: object | string): void {
            localStorage.setItem(key, JSON.stringify(value));
    }
}

export default new LocalStorageService();