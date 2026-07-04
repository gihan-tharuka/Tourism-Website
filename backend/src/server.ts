import app from "./app";
import { connectMongoDB } from "./config/mongodb";

const port = process.env.PORT || 5000;

connectMongoDB();

app.listen(port, () => {
  console.log(`Beyond Sea Travels API running on port ${port}`);
});
