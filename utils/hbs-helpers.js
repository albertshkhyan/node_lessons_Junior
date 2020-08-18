// Basic Blocks (conditional)
module.exports = {
    ifeq(a, b, options) {//if equalt
        //options {fn, inverse, data:{} } 
        // console.log('b', b);
        // console.log('a', a);
        // console.log('options', options);
        if(a === b) {
            // console.log('this', this);
            /**
             * this {
                title: 'React JS',
                id: 5f2afb0db964438020fd432d,
                price: '300000',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
                userID: '5f27518dbc5a4831207deb9b'
                }
             */
            return options.fn(this);
        }

        // options.inverse
        // console.log('this 2', this);
        /**
         * this 2 {
            title: 'Angular 8',
            id: 5f2b337dcf50b6a35c1a6ff4,
            price: '400000',
            image: 'https://angular.io/assets/images/logos/angular/angular.png',
            userID: '5f2aac93b04c375d04fbf51f'
            }
         */
        //Handlebars provides the block for the else fragment as options.inverse. inverse - обратный
        return options.inverse(this);//context of else
    }
}