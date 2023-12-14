import { dotenv,express,cors } from "./packages/packages.js";
dotenv.config();
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app=express();

connectDB();

app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs')
app.use("/users",userRouter);

app.listen(3001,()=>{
    console.log("server is listening at port 3001");
})