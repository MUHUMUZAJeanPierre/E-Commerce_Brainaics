import UserModel from "../models/userMode.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists", status: false });
        }
        
        const encrypted = bcrypt.hashSync(password, 10);
        const toSave = {
            name,
            email,
            password: encrypted,
        };

        const create = await UserModel.create(toSave);
        res.status(201).json({ message: "User created successfully", status: true, user: create });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", status: false, error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExit = await UserModel.findOne({ email });

        if (!userExit) {
            return res.status(404).json({ message: "User not found", status: false });
        }

        const valid = bcrypt.compareSync(password, userExit.password);
        if (!valid) {
            return res.status(401).json({ message: "Invalid password", status: false });
        }
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({ id: userExit._id }, secret);
        res.status(200).json({ message: "Login success", status: true, token: token, user: userExit });
    } catch (error) {
        res.status(500).json({ message: "Login failed", status: false, error: error.message });
    }
};
