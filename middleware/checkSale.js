const Product = require("../models/product.model");
const SaleModel = require("../models/sale.model");

async function checkSale() {
  let Sale = await SaleModel.find({ status: 1 });
  if (!Sale || Sale.length === 0) return;
  for (let i = 0; i < Sale.length; i++) {
    let time = new Date().getTime();
    if (Sale[i].endDate < time) {
      await SaleModel.findOneAndUpdate(Sale[i].id, { status: 2 });
      await Product.updateMany({ saleID: Sale[i].id }, { saleID: null });
    }
  }
}

module.exports = { checkSale };
