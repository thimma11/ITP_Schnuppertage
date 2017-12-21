var express = require('express');
var router = express.Router;


router.get('/', (request, response) => {
    response.write("hello");
});


exports.default = router;




