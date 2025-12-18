import { AuthRegisterFormDto } from "src/DTO/Auth/auth.form.dto";
import { UserEntity } from "src/entities/user.entity";

export function AuthRegisterFormDtoToEntity(dto : AuthRegisterFormDto): UserEntity{
    const user = new UserEntity

    user.username = dto.username;
    user.email = dto.email;
    user.password = dto.password

    return user

}