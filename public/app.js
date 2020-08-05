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
            // console.log('event.target.dataset', event.target.dataset);
            const csrf  = event.target.dataset.csrf;
            fetch(`cart/remove/${id}`, {
                method: "delete",
                headers: {
                    "X-CSRF-TOKEN": csrf
                }
            })
                .then((res) => res.json())
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
                                        data-csrf="${csrf}"
                                        data-id="${c.id}">delete</button>
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


const dateFormat = (date) => {
    return new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: "2-digit",
        second: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}
// console.log('dateFormat()', dateFormat(Date.UTC(2019, 03, 25, 3, 0, 0)));

const $date = document.querySelectorAll(".date");
// console.log('$date', $date);

$date.forEach(d => {
    d.textContent = dateFormat(d.textContent);
});


var instance = M.Tabs.init(document.querySelector(".tabs"));
