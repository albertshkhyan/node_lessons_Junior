////in here will be  clients scripts, in here is Javascript
// console.log('document', document);//show in browser

const formatPrice = (price) => {
    return (
        new Intl.NumberFormat("am-AM", {
            style: 'currency', currency: 'arm'
        }).format(price)
    )
}

document.querySelectorAll(".price").forEach((node) => {
    node.textContent = formatPrice(node.textContent);
});


////give event and handle

const $cart = document.querySelector(".cart");
if ($cart) {
    $cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;
            fetch(`cart/remove/${id}`, {
                method: "delete"
            }).then((res) => res.json())
                .then(res => {
                    if (res.courses.length) {
                        ////after mapping on array, then add, like this more simple
                        const content = res.courses.map(c => {
                            return (`
                            <tr>
                                <td>${c.title}</td>
                                <td>${c.count}</td>
                                <td>
                                    <button class="wbtn-floating btn-small waves-effect waves-light red js-remove"
                                        data-id=${c.id}>delete</button>
                                </td>
                            </tr>
                            `
                            )
                        }).join('');
                        document.querySelector(".cart tbody").innerHTML = content;
                        document.querySelector(".cart .price-content").innerHTML = formatPrice(res.price);
                    }
                    else {
                        $cart.innerHTML = `<p>No have course</p>`;
                    }

                })
        }
    })
}

