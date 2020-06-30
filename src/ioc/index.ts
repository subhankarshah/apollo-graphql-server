import "reflect-metadata"
import { Container } from "inversify"
import { registerBindings } from "./inversify.config"

const container = new Container()
registerBindings(container)
export default container