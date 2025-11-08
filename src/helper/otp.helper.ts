export const otpGenerator = () => {
    const otp = process.env.MODE === 'dev' ? '000000' : Math.floor(100000 + Math.random() * 900000).toString();
    return otp

}