window.onload = function() {
var addProduct = function (){
console.log('/product/add');
};
var editProduct = function (){
var idProduct = this.getAttribute("data-id-product");
console.log('/product/edit?idProduct='+idProduct);
};
var deleteProduct = function (){
var idProduct = this.getAttribute("data-id-product");
console.log('/product/delete?idProduct='+idProduct);
};
document.getElementById('btnAdd').onclick = addProduct;
document.getElementById('btnEdit').onclick = editProduct;
document.getElementById('btnDelete').onclick = deleteProduct;
};
