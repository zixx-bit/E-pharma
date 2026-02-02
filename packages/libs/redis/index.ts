import Redis from "ioredis";

const redis = new Redis("rediss://default:AZESAAIncDFkYzk0MDAzNzI0ODU0MTdkYTdlNjcyODQzMzUxOTgwM3AxMzcxMzg@chief-doe-37138.upstash.io:6379");
[{
	"resource": "/g:/projects/goodlife/epharma/apps/auth-service/src/utils/auth.helper.ts",
	"owner": "typescript",
	"code": "2769",
	"severity": 8,
	"message": "No overload matches this call.\n  The last overload gave the following error.\n    Argument of type '\"Ex\"' is not assignable to parameter of type '\"KEEPTTL\"'.",
	"source": "ts",
	"startLineNumber": 66,
	"startColumn": 54,
	"endLineNumber": 66,
	"endColumn": 58,
	"relatedInformation": [
		{
			"startLineNumber": 3640,
			"startColumn": 5,
			"endLineNumber": 3640,
			"endColumn": 151,
			"message": "The last overload is declared here.",
			"resource": "/g:/projects/goodlife/epharma/node_modules/ioredis/built/utils/RedisCommander.d.ts"
		}
	],
	"modelVersionId": 37
}]
export default redis;