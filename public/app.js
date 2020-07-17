////in here will be  clients scripts, in here is Javascript
// console.log('document', document);//show in browser

document.querySelectorAll(".price").forEach((node) => {
    node.textContent = new Intl.NumberFormat("am-AM", {
        style: 'currency', currency: 'arm'
    }).format(node.textContent);
});


////give event and handle

const $cart = document.querySelector(".cart");
if ($cart) {
    $cart.addEventListener('click', event => {
        if(event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;
            // console.log('id', id);\
            fetch(`cart/remove/${id}`, {
                method:"delete"
            }).then((res) => res.json())
            .then(res => {
                console.log('res', res);

            })
            
            // console.log('res.json()', res.json());


        }
    })
}

