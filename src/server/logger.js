function writeMessage(log, level, message, obj){
    if (level == null){
        log.info(obj != null ? obj : '',message);
        return;
    }
    
    switch (level) {
        case 'trace':
            log.trace(obj != null ? obj : '',message);
            break;
        case 'debug':
            log.debug(obj != null ? obj : '',message);
            break;
        case 'warn':
            log.warn(obj != null ? obj : '',message);
            break;
        case 'error':
            log.error(obj != null ? obj : '',message);
            break;
        case 'fatal':
            log.fatal(obj != null ? obj : '',message);
            break;
        default:
            log.info(obj != null ? obj : '',message);
            break;
    }
}

exports.writeMessage = writeMessage;