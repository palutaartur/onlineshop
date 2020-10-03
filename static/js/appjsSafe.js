
//Shopping cart
//Functia care va intreba daca sigur dorim sa eliminam produsul din cart
var confirm = function(msg, okFunction){
  if(window.confirm(msg)){
    okFunction();
  }
  //functia de mai sus e necesara pentru a stiliza metoda confirm
  //deocamdata metoda confirm e apelata prin системный диалог браузера
  //daca vom dori sa folosim vreun модальный диалог (кастомный)
  //vom modifica functia confirm ca sa apeleze nu системный диалог, ci
  //ci vreun dialog special ca cel din functia showAddProductPopup
};
//functia urmatoare va apela metoda confirm si va transmite controlul
//functiei care va indeplini eliminarea.
var removeProductFromCart = function(){
//cream obiectul button
  var btn = $(this);
//in cazul confirmarii:
confirm('Are you shure?', function(){
  executeRemoveProduct(btn);
});
};
//trebuie sa facem assign functiei de mai sus la toate butoanele
//care au clasa .remove-product, si o facem in metoda init(la inceput)
var executeRemoveProduct = function(btn) {
  //la inceput citim idProduct si cantitatea din obiectul nostru btn(mai sus):
  var idProduct = btn.attr('data-id-product');
  var count = btn.attr('data-count');
//  acum stilizam butonul ca la apasare sa se faca roticica
    btn.removeClass('btn-danger');
    btn.removeClass('btn');
    btn.addClass('load-indicator'); //creez clasa load-indicator in app.css
//mai am stilizat butonul astfel incat el nu mai este buton,
//dar a ramas textul(Remove One, Remove All) si a ramas обработчик щелчка
//de aceea, la inceput trebuie sa eliminam textul:
    //salvam textul in var text;
    var text = btn.text();
    //in buton salvam un string 0
    btn.text('');
    //удаляем обработчик щелчка:
    btn.off('click');
// дальше выполняется запрос, ждём ответ от сервера:
    setTimeout(function(){
      //в обработчике ответа получаем данные от сервера:
      var data = {
        totalCount : 1,
        totalCost : 1
        //de pe servem vom verifca cantitatea si suma
      };
      if(data.totalCount === 0){
        window.location.href = 'products.html';
      } else {
        var prevCount = parseInt($('#poduct'+idProduct+' .count').text());
        //count-ul e luat din shopping-cart.html <td class="count">1</td>
        //acum obtinem count-ul dupa eliminarea produselor:
        var remCount = parseInt(count);
        //daca numarul elementelor eliminate = nr elementelor din cart,
        //trebuie sa eliminam tot blocul cu info despre acel produs:
        if(remCount == prevCount){
          $('#product'+idProduct).remove();
        } else {
          //daca mai avem alte produse in cart restabilim butonu prin inversare
          btn.removeClass('load-indicator');
          btn.addClass('btn-danger');
          btn.addClass('btn');
          //restabilim textul lui
          btn.text(text);
          //добавляем обработчик обратно:
          btn.click(removeProductFromCart);
          //acum schimbam cantitatea produselor ramase:
          $('#product'+idProduct+' .count').text(prevCount - remCount);
          if(prevCount - remCount == 1) {
            $('product'+idProduct+' a.remove-product.all').remove();
          }
        }
      }
    },1000);
}
