import moment from "moment-timezone"
import { IndiaTimezone } from "../constants/globalConstants"

export class TimeUtil {
	static getISTMoment(){
		return moment().tz(IndiaTimezone)
	}

	static unixEpochNow(){
		return moment().unix()
	}
}