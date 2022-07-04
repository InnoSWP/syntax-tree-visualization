import {CodeRepo} from "../repo/codeRepo"
import {fileSysRepo as repo} from "../repo/FileSysRepoImpl"

class SaveService {
    repo :CodeRepo = repo
    save(code: String) {
        return this.repo.save(code)
    }
    get(hash: String) {
        return this.repo.get(hash)
    }
}

export const saveService = new SaveService()