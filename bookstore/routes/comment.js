var express = require('express');
var router = express.Router();
var cors = require('cors');

var books= [
  {
        id: 1,
        name: "The Life of Pie",
        author: "Augatha Princess",
        isbn: "ISBN0001606",
        pdate: "2015-12-30",
        publisher: "Scholastic Press",
        price: "200",
        genre: "Science fiction",
        format: "Hardcover",
        
      }
    ]
    router.get("/",function (req,res){
        res.json(books);
    });

    router.get("/:id",cors(),function(req,res){
        var bookid = parseInt(req.params.id);
        var currentBook = books.filter(e=>e.id==bookid)[0];
  
        if(currentBook){
           res.json(currentBook);
        }else{
           res.sendStatus(404);
      }
  });
  
  

router.post("/",cors(),function (req,res) {
	var x = Math.floor((Math.random() * 1000) + 1);
	var jsonString = '';
	if (req.method == 'POST') {
        

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
			var book = JSON.parse(jsonString);
	book.id=books.length+1;
	book.checked=false;
        books.push(book);
		res.send(books);
        });
    }	
    
});


// //Update book
router.put("/:id",cors(),function (req,res) {  
    var bookid = parseInt(req.params.id);
    var currentBook = books.filter(e=>e.id==bookid)[0];
    if(currentBook){
        let book = req.body;
            currentBook.title = book.title;
            currentBook.author = book.author;
            currentBook.isbn = book.isbn;
            currentBook.pubdate = book.pubdate;
            currentBook.publisher = book.publisher;
            currentBook.price = book.price;
            currentBook.genre = book.genre;
            currentBook.format = book.format;
            currentBook.checked = book.checked;
            res.json(books);
      
    }else{        
        res.sendStatus(404);
    }
});

//delete book
router.delete("/:id", cors(),function(req,res){
    var bookid = parseInt(req.params.id);
    var currentBook = books.filter(e=>e.id==bookid)[0];
    if(currentBook){
        books = books.filter(e=>e.id!=bookid);
        res.json(books);
    }else{
        res.json(books);
    }
});
router.options("*",cors());



module.exports = router;
