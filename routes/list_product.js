var express = require('express');
var productRepo = require('../database/repos/productRepo.js');
var config = require('../config/config.js');
var router = express.Router();

router.get('/all', function (req, res) {
      var url = '/products' + req.url;
      var page = req.query.page;

      if (url.lastIndexOf('?page') != -1)
            url = url.substr(0, url.lastIndexOf('?page'));

      if (!page) page = 1;

      let offset = (page - 1);

      let pageList = [];

      Promise.all([productRepo.countAllProducts(), productRepo.loadAll(offset)]).then(values => {
            let total = values[0][0].TOTAL;

            let result = {
                  instruction: 'Có tổng cộng',
                  total: `${total} sản phẩm`
            }

            let numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

            for (let i = 0; i < numberOfPages; i++) {
                  pageList.push({
                        url: `${url}?page=${i + 1}`,
                        isCurPage: (i + 1) === +page,
                        val: i + 1
                  });
            }

            var prevPage = {
                  url: `${url}?page=${+page - 1}`,
                  isOK: 1 !== +page
            }

            var nextPage = {
                  url: `${url}?page=${+page + 1}`,
                  isOK: numberOfPages !== +page
            }

            res.render('list_product', {
                  title: 'Book store',
                  products: values[1],
                  pages: pageList,
                  result,
                  prevPage,
                  nextPage
            });
      });
});

router.get('/byManu/:id_Manufacturer', function (req, res) {
      var id_Manufacturer = req.params.id_Manufacturer;
      var url = '/products' + req.url;
      var page = req.query.page;

      if (url.lastIndexOf('?page') != -1)
            url = url.substr(0, url.lastIndexOf('?page'));

      if (!page) page = 1;

      let offset = (page - 1);

      let pageList = [];

      Promise.all([productRepo.countByManufacturer(id_Manufacturer), productRepo.loadAllByManufacturer(id_Manufacturer, offset)]).then(values => {
            let total = values[0][0].TOTAL;

            let result = {
                  instruction: 'Có tổng cộng',
                  total: `${total} sản phẩm`
            }

            let numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

            for (let i = 0; i < numberOfPages; i++) {
                  pageList.push({
                        url: `${url}?page=${i + 1}`,
                        isCurPage: (i + 1) === +page,
                        val: i + 1
                  });
            }

            var prevPage = {
                  url: `${url}?page=${+page - 1}`,
                  isOK: 1 !== +page
            }

            var nextPage = {
                  url: `${url}?page=${+page + 1}`,
                  isOK: numberOfPages !== +page
            }

            res.render('list_product', {
                  title: 'Book store',
                  products: values[1],
                  pages: pageList,
                  result,
                  prevPage,
                  nextPage
            });
      });
});

router.get('/byClass/:id_Class', function (req, res) {
      var id_Class = req.params.id_Class;
      var url = '/products' + req.url;
      var page = req.query.page;

      if (url.lastIndexOf('?page') != -1)
            url = url.substr(0, url.lastIndexOf('?page'));

      if (!page) page = 1;

      let offset = (page - 1);

      let pageList = [];

      Promise.all([productRepo.countByType(id_Class), productRepo.loadAllByType(id_Class, offset)]).then(values => {
            let total = values[0][0].TOTAL;

            let result = {
                  instruction: 'Có tổng cộng',
                  total: `${total} sản phẩm`
            }

            let numberOfPages = Math.ceil((total / config.appConfig.PRODUCTS_PER_PAGE));

            for (let i = 0; i < numberOfPages; i++) {
                  pageList.push({
                        url: `${url}?page=${i + 1}`,
                        isCurPage: (i + 1) === +page,
                        val: i + 1
                  });
            }

            var prevPage = {
                  url: `${url}?page=${+page - 1}`,
                  isOK: 1 !== +page
            }

            var nextPage = {
                  url: `${url}?page=${+page + 1}`,
                  isOK: numberOfPages !== +page
            }

            res.render('list_product', {
                  title: 'Book store',
                  products: values[1],
                  pages: pageList,
                  result,
                  prevPage,
                  nextPage
            });
      });
});

module.exports = router;