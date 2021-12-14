class CartItem {
    constructor(id,item,quantity){
        this.id=id;
        this.item=item;
        this.quantity=quantity;
    }

addCartItem()
{
    this.quantity=this.quantity+1;
}
removeCartItem()
{
    if(this.quantity>1)
    this.quantity=this.quantity-1;
}

getTotalprice()
{
    return (this.quantity * this.item.price)
}

}


export default CartItem;