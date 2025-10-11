export class UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    address: string;
    phone: number;
    gender: string;
    profile_image: string;
    isVerified: boolean;
    isActive: boolean;


    constructor(user: any) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role;
        this.address = user.address;
        this.phone = user.phone;
        this.gender = user.gender;
        this.profile_image = user.profile_image;
        this.isVerified = user.isVerified;
        this.isActive = user.isActive;

    }

}