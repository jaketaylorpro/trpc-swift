import { ZodTypeAny, z } from "zod";

type ZodSwiftMetadata = {
    name?: string;
    description?: string;
    global?: boolean;
    id?: string;
};

declare module "zod" {
    interface ZodTypeDef {
        swift?: ZodSwiftMetadata;
    }

    interface ZodType {
        swift<T extends ZodTypeAny>(this: T, metadata: ZodSwiftMetadata): T;
    }
}

export const extendZodWithSwift = (zod: typeof z) => {
    zod.ZodType.prototype.swift = function (metadata: ZodSwiftMetadata) {
        this._def.swift = {
            name: metadata.name ?? this._def.swift?.name,
            description: metadata.description,
            id: metadata.id,
            global: metadata.global
        };
        return this;
    };
};
