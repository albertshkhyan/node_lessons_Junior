////in here will be  clients scripts, in here is Javascript
// console.log('document', document);//show in browser

document.querySelectorAll(".price").forEach((node) => {
    node.textContent = new Intl.NumberFormat("am-AM", {
        style: 'currency', currency: 'arm'
    }).format(node.textContent);
});


