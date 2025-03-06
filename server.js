import express from 'express';
import fs from 'fs';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//POST METHOD - ADD BOOK
app.post('/add-book', (req,res) => {

    // console.log ("Testing received body:", req.body);

    const {bookName, ISBN, author, yearPublished} = req.body;

    //check first if null or something is missing 
    if (!bookName || !ISBN || !author || !yearPublished) {
        return res.send({ success: false });
    }

    //read file the books.txt 
    fs.readFile("books.txt", 'utf8', (err, data) => {
        // error handling
        if (err && err.code !== 'ENOENT') {
            return res.send({ success: false });
        }

        let books = []; //for checking later

        if(data){ //if data is not null
            //split the data per line
            const splitData = data.split('\n');
            for (let line of splitData){ //loop through the array of splitdata
                const info = line.split(','); //split each line for accessing the specific info
                if(info.length > 1){ //if it has more than 1
                    books.push(info[1]); //push the index 1 which is the isbn
                }
            }
        }
        
        //check if there is a exisitng isbn
        if (books.includes(ISBN)) {
            return res.send({ success: false, message: "ISBN already exists." });
        }
    
        // if it is a valid entry, append it to the file
        const bookInformation = `${bookName},${ISBN},${author},${yearPublished}\n`;

        fs.appendFile("books.txt", bookInformation, (err) => {
            if (err) {
                return res.send({ success: false });
            }
            res.send({ success: true });
        });
    });
}
);

// GET METHOD FIND BY AUTHOR
app.get('/find-by-isbn-author', (req, res) => {
    // console.log("test query", req.query);
    const {isbn, author} = req.query;

    //check first if null
    if (!isbn || !author){
        return res.send({ success: false, message: "no data" });
    }

    //to store the matching book
    let matchingBooks = null; 

    fs.readFile("books.txt", 'utf8', (err, data) => {
        // error handling
        if (err && err.code !== 'ENOENT') {
            return res.send({ message: "no file existing" });
        }

        if(data){
            // same with the previous function split per line and per information
            const splitData = data.split('\n');
            for (let line of splitData){
                const info = line.split(',');
                // store the isbn and author found (index 1 and index 2)
                const bookISBN = info[1];
                const authorName = info[2];
                // console.log(authorName, bookISBN); for checking

                // check if they are equal for both isbn and author name 
                if(author.toLowerCase() === authorName.toLowerCase() && bookISBN === isbn){
                  //store the infomation into the matching book
                    matchingBooks =  {
                        bookName : info[0],
                        ISBN : bookISBN,
                        authorName : authorName,
                        yearPublished : info[3]
                    }; 
                    break;
                }
            }
        }

        if (matchingBooks){ //if not null return the matched book
            return res.send({matchingBooks});
        } else {
            return res.send({success: false, message: "no matching book"});
        }
    });
});

// GET METHOD FIND BY AUTHOR
app.get('/find-by-author', (req,res) => {
    const {author} = req.query;

    //check first if not null
    if (!author){
        return res.send({ success: false });
    }

    // to store the matching books
    let matchingBooks = [];


    fs.readFile("books.txt", 'utf8', (err, data) => {
        //error handling
        if (err && err.code !== 'ENOENT') {
            return res.send({message: "no file existing" });
        }

        if(data){
            //split into lines and per information
            const splitData = data.split('\n');
            for (let line of splitData){
                const info = line.split(',');
                //store book author name 
                const bookAuthor = info[2];

                // if they are equal, add the book details into the list
                if (bookAuthor === author) {
                    matchingBooks.push({
                        bookName: info[0],
                        ISBN: info[1],
                        author: bookAuthor,
                        yearPublished: info[3]
                    });
                }
            }
        }

        // if it has books stored, return the list
        if (matchingBooks.length > 0){
            return res.send({ matchingBooks });
        } else {
            return res.send({ message : "no matching books"});
        }
       
    })

});


app.get('/', (req, res) => {
    res.send(`Web Server using Express JS - Book Management`);
});

// Start the server
app.listen(3000, () => {
    console.log(`Server started at port http://localhost:3000`);
});
