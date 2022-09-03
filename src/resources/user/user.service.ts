import userModel from "./user.model";
import token from "@/utils/token";

class UserService{
    private user = userModel;

    //register new user

    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role,
            });
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            throw new Error("unable to create user");
        }
    }

    //login attempt

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email});
            if(!user){
                throw new Error("invalid email");
            }
            if(await user.isValidPassword(password)){
                return token.createToken(user);
            }else{
                throw new Error("incorrect password");
            }
        } catch (error) {
            throw new Error("unable to create user");
        }
    }
}

export default UserService;