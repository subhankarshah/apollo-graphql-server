export interface CronInterface {
	startJob(): void
	cronFunction(): void
}