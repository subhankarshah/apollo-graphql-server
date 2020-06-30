import { injectable } from "inversify"
import cron from 'cron'
import { CronInterface } from "./cronInterface";
import { IndiaTimezone } from "../constants/globalConstants";


@injectable()
export class DemoCron implements CronInterface {

	private job

	constructor() {
		this.job = new cron.CronJob('0 0/30 * * * *', this.cronFunction, null, null, IndiaTimezone, this, false);
	}

	async cronFunction() {
		console.log('Cron Invoked Every 30 minutes')
	}

	async startJob(){
		this.job.start()
	}
}