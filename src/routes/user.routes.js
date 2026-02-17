import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import jwtMiddleware from "../controllers/jwtmiddleware";
const router = Router();
import Session from "../models/session.model";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/sessions", jwtMiddleware, (req, res) => {
    try {
        const mysessions = Session.find({createdby: req.user.id})
        .then(sessions => {
            res.json(sessions);
        })
        .catch(err => { res.status(500).json({message: "Error fetching sessions"});
        });
    } 
    catch (err) {
        res.status(500).json({message: "Error fetching sessions"});
    }
});
router.post("/createsessions", jwtMiddleware, async (req, res) => {
    try{
        const decoded = req.user;
        const {duration, tag} = req.body;
        if (!duration || !tag){
            return res.status(400).json({message: "Duration and tag are required"});
        }
        const newSession = new Session({
            duration,
            tag,
            createdby: decoded.id
        })
        const  newSessionSave = await newSession.save();
        res.status(201).json(newSessionSave);
        
    }
    catch(err){
        res.status(500).json({message: "Error creating session"});
    }
});
export default router;


