import { Role } from "src/shared/enum/role.enum";

export interface Session {
    id: string,
    role: Role
}
