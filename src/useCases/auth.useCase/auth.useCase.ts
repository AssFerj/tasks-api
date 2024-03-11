import jwt from 'jsonwebtoken';

class AuthUseCase{
    createToken(data: any): string {
        return jwt.sign(data, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        })
    }
    decodeToken(token: string): boolean {
        try {
            jwt.verify(token, process.env.JWT_SECRET!);
            return true
        } catch {
            return false
        }
    }
}

export {AuthUseCase}