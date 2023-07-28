import dayjs from "dayjs"
import * as util from "util"

let logFileName = "indegx.log"

export function setLogFileName(fileName: string) {
    if(fileName == null || fileName == undefined || fileName == "") {
        logFileName = "indegx.log";
    } else {
        logFileName = fileName;
    }
}

export function log(logObject: any, ...o: any[]) : void {
    logging("LOG", logObject, ...o);
}

export function error(logObject: any, ...o: any[]) : void {
    logging("ERROR", logObject, ...o);
}

export function info(logObject: any, ...o: any[]) : void {
    logging("INFO", logObject, ...o);
}

function logging(level, logObject: any, ...o: any[]): void {
    const now = dayjs();
    const message = util.format("[%s][%s]: ", level, now.toISOString());
    console.error(message, logObject, ...o);
}