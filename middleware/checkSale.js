import ProductModel from "../models/product.model";
import SaleModel from "../models/sale.model";

export async function checkSale() {
  let Sale = await SaleModel.find({ status: 1 });
  for (let i = 0; i < Sale.length; i++) {
    let time = new Date().getTime();
    if (Sale[i].endDate < time) {
      await SaleModel.findOneAndUpdate(Sale[i].id, { status: 2 });
      await ProductModel.updateMany({ saleID: Sale[i].id }, { saleID: null });
    }
  }
}
