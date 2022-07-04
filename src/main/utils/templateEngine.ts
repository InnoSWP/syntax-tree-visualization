export function templateEngine(code: String, params: Map<String, Object>) {
    params.forEach((value, key) => {
        code = code.replaceAll("[[${" + key + "}]]", value.toString())
    })
    return code
}