import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";


export default async (req, res, next) => {
	let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const client = req.app.locals.client;
	if (req.body.email)	{
		if (regex.test(req.body.email) == false) {
			res.status(400).json({
				source : "email",
				issue : "invalid email"
			})
			return;
		}
		const email_exists = (await client.db("buildr").collection("users").countDocuments({ email: req.body.email })) > 0;
		if (email_exists) {
			res.status(400).json({
				source : "email",
				issue : "email already in use"
			})
			return;
		}
	} else {
		res.status(400).json({
			source : "email",
			issue : "invalid email"
		})
		return;
	}


	regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

	if (req.body.password) {
		if (!regex.test(req.body.password)) {
			res.status(400).json({
				source : "password",
				issue : "Invalid password"
			})
			res.end();
			return;
		}

		hash(req.body.password, 10, async (err, hash) => 	{
			if (err) {
				res.status(500).json({
					source : null,
					issue : "Something went wrong, please try again"
				})
				return;
			}
				req.body.password = hash;
				const newUser = await client.db("buildr").collection("users").insertOne(req.body);
				const token = await sign({ userId: newUser.insertedId }, "my-string", { expiresIn: "24h" });
				res.status(201).json({
						userId: newUser.insertedId,
						token: token,
				});
		})

	} else {
		res.status(400).json({
			source : "email",
			issue : "please input password"
		})
		return;
	}
}