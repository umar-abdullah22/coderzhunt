"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidTransformer = void 0;
const typeorm_1 = require("typeorm");
const src_1 = require("../../../utils/src");
exports.UuidTransformer = {
    to: (value) => {
        const uuid = value === null || value === void 0 ? void 0 : value.uuid;
        if (uuid)
            return uuid;
        const operator = value;
        return (0, typeorm_1.In)(operator.value.map((v) => v.uuid));
    },
    from: (value) => new src_1.Uuid(value),
};
//# sourceMappingURL=mysql.js.map