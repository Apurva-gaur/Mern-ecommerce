import { Cart } from "../Models/Cart.js";


// to add product in cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;

  const userId=req.user;
   
   let cart=await Cart.findOne({userId})
  if(!cart)
  {
        cart = new Cart({ userId, items: [] }); 
  }
  // already exist and product also existed so increase the quantity and price
  const itemIndex= await cart.items.findIndex((eachItem)=>eachItem.productId.toString()===productId)
   if(itemIndex>-1)
   {
    // increase the quantity
    cart.items[itemIndex].qty+=qty
    cart.items[itemIndex].price+=price*qty
   }
   else{
     
    cart.items.push({ productId, title, price, qty, imgSrc });
   }
 


  await cart.save();
  res.json({ message: "Items Added To Cart", cart });
};
// get user specific cart
export const userCart=async (req,res)=>{
  // const { userId }=req.body
  const userId = req.user;
  let cart= await Cart.findOne({userId})
  if(!cart)
  {
     return res.json({message:"cart does not find"})
  }
  res.json({message:"cart find successfully",cart})
}
// remove product from cart
export const removeProductFromCart = async (req, res) => {  
    const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ messge: "Cart not found" });

  let filtercart = await cart.items.filter((item)=>item.productId.toString() !== productId)
  cart.items=filtercart

  await cart.save();

  res.json({ message: "product remove from cart",cart});
};

//clear cart
export const clearCart = async (req, res) => {

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart){
    cart = new Cart({items:[]})// if not find the create user cart here
  } else{
    cart.items = [];
  }
  
  await cart.save();

  res.json({ message: " cart cleared"});
};
//  items decrease by id
export const decreaseProudctQty = async (req, res) => {
  const { productId, qty} = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
 
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    // return res.json({messge:'Cart not find'})
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex]

    if(item.qty > qty){
        const pricePerUnit = item.price/item.qty

        item.qty -= qty
        item.price -= pricePerUnit*qty
    }else{
        cart.items.splice(itemIndex,1)
    }

  } else {
    return res.json({messge:'invalid product Id'})
  } 

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};