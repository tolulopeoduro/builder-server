import { ObjectId } from "bson";

export default async (req, res, next) => {
	req.app.locals.client.db("buildr").collection("projects")
	.updateOne(
		{_id: new ObjectId(req.body.id)},
		{$set : {
			...req.body.data
		}},
		{upsert : false}
	).then (() => {
		res.status(201).json({
			message : "Success"
		})
	})
}