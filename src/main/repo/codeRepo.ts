export interface CodeRepo {
    save(code: String): String

    get(hash: String): String
}
