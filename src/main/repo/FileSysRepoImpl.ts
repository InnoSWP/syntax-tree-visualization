import {CodeRepo} from "../repo/codeRepo"
import {hashCode} from "../utils/usefullFunctions"
import fs from "fs"

class FileSysRepoImpl implements CodeRepo {
    get(hash: String): String {
        return fs.readFileSync("./.userfiles/" + hash.toString() + ".txt").toString()
    }

    save(code: String): String {
        let hash = hashCode(code);
        if (fs.existsSync("./.userfiles/" + hash.toString() + ".txt")) {
            fs.unlinkSync("./.userfiles/" + hash.toString() + ".txt")
        }
        fs.writeFileSync("./.userfiles/" + hash.toString() + ".txt", code.toString(), {flag: 'wx'})
        return hash.toString()
    }
}

export const fileSysRepo = new FileSysRepoImpl()