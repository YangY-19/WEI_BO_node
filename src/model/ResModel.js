/**
 * @description res 数据模型
 * @author YangY
*/

/**
 * 基础模块
 * @class BaseModel
 */
class BaseModel {
    constructor({code, data, message}) {
       this.code = code
       if (data) {
           this.data = data
       }
       if (message) {
           this.message = message
       }
    }
}

/**
 * 成功数据模型
 * @class SuccessModel
 * @extends {BaseModel}
 */
class SuccessModel extends BaseModel {
    constructor(data) {
        super({ //super 调用父类constructor
            code: 10000,
            data
        })
    }
}

/**
 * 失败数据模型
 * @class ErrorModel
 * @extends {BaseModel}
 */
class ErrorModel extends BaseModel {
    constructor({code, message}) {
        super({
            code,
            message
        })
    }
}


module.exports = {
    SuccessModel,
    ErrorModel
}