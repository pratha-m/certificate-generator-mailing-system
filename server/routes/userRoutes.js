import {express,multer} from "../packages/packages.js";
import { createUser, getAllUsers } from "../controllers/userController.js";

const router=express.Router();

const upload=multer({storage: multer.memoryStorage()});

router.post("/create",upload.single("file"),createUser);

router.post("/all",getAllUsers);

export default router;