// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async products => {

    products.data.stockValue = products.data.qtStock * products.data.unityValue;

    if (products.data.percentSell) {
      if (products.data.percentSell >= 0.01 && products.data.percentSell <= 9.99) {
        products.data.percentSell = products.data.percentSell
      } else {
        throw new Error(`Percentual de venda não está de acordo com o regra, percentual informado é ${products.data.percentSell}`);

      }
    }

    return products;
  };

};
