import { inject, injectable } from "inversify"
import { TYPES } from "../ioc/TYPES"
import { CronInterface } from "../crons/cronInterface"
import { EnvConfigInterface } from "../constants/types"


@injectable()
export class CronUtil {

	private _crons: CronInterface[]

	constructor(
		@inject(TYPES.EnvConfig) private envConfig: EnvConfigInterface,
		@inject(TYPES.DemoCron) demoCron: CronInterface
	){
		this._crons = [demoCron]
	}

	async startCrons(){
		if(!this.envConfig.START_CRONS)
			return
		this._crons.forEach(cron => {
			cron.startJob()
		});
	}
}