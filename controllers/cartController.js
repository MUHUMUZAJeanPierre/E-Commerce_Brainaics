import UserModel from "../models/userMode.js";

export const addToCart = async(req,res,next)=>{
     try {
        let userData = await UserModel.findOne({ _id:req.body.userId });
        let cartData = await userData.cartData || {};    
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        } else{
            cartData[req.body.itemId]++;
        }

        await UserModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.status(200).json({ message: "Item added to cart successfully", data: cartData, status: true });
     } catch (error) {
        console.log();
        res.status(500).json({ message: "Error adding item to cart", status: false, error: error.message });
     }
}

export const removeFromCart = async(req,res,next)=>{
    try {
        let userData = await UserModel.findOne({ _id:req.body.userId });
        let cartData = userData.cartData || {};
        if(cartData[req.body.itemId]){
            if(cartData[req.body.itemId] > 1){
                cartData[req.body.itemId]--;
            } else{
                delete cartData[req.body.itemId];
            }
        } else{
            return res.status(404).json({ message: "Item not found in cart", status: false });
        }  
        
        await UserModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.status(200).json({ message: "Item removed from cart successfully", data: cartData, status: true });
    } catch (error) {
        res.status(500).json({success:false, message: "error removing from cart", error:error.message})
    }
}

export const getCart = async (req, res) => {
    try {
        let userData = await UserModel.findOne({ _id: req.body.userId });
        let cartData = await  userData.cartData || {};
        res.json({ success: true, cart: cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching cart", error: error.message });
    }
}