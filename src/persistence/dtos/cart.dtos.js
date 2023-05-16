import jwt from "jsonwebtoken";
import obj from "../../config.js"

export const newCartDB = (propsNewCart) => {
    const data = jwt.verify(propsNewCart, obj.secret_key_jwt);
    return data.user.email;
}