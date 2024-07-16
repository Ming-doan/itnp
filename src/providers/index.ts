import localStorage from "./localStorage";

const providers = {
  localStorage: localStorage,
};

class StorageProvider {
  read(key: string, defaultValue?: object | string): object | string {
    return providers.localStorage.read(key, defaultValue);
  }

  createOrUpdate(key: string, value: object | string): void {
    providers.localStorage.createOrUpdate(key, value);
  }
}

export default new StorageProvider();
