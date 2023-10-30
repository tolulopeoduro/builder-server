export default async (req, res, next) => {
	req.app.locals.client.db("buildr").collection("projects")
	.insertOne(req.body);
	res.status(201).json({
		message : "Project added"
	})
}