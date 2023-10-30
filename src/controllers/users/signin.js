import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export default async (req, res, next) => {
	const client = req.app.locals.client;

	client.db("buildr").collection("users").findOne({email : req.body.email})
	.then(user => {
		if (!user) {
			return res.status(404).json({
				source : "email",
				issue: "User with this email does not exist"
			})
		}
		
		compare(req.body.password, user.password).then(valid => {
			if (!valid) {
				return res.status(401).json({
					source : "password",
					issue : "Incorrect password"
				})
			}
			const token = sign({userId: user._id}, "my-string", {expiresIn: "24h"});
			res.status(200).json({
				userId: user._id,
				token: token
			})
		})
	})


}