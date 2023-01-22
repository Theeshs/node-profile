import jwt from 'jsonwebtoken'


export const singJWT = async (
    payload: object, secretKey: string, expireTime: number) => {
    const privateKey = Buffer.from(secretKey,
        'base64'
    ).toString('ascii');

    return await jwt.sign(
        payload, privateKey, {
        expiresIn: `${expireTime}h`
    }
    )
}