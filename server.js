import express from 'express';
import fs from 'fs';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/add-book', (req,res) => {

    console.log ("Testing received body:", req.body);

    const {bookName, ISBN, author, yearPublished} = req.body;

    if (!bookName || !ISBN || !author || !yearPublished) {
        return res.send({ success: false });
    }

    fs.readFile("books.txt", 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.send({ success: false });
        }

        let books = [];
        if(data){
            const splitData = data.split('\n');
            for (let line of splitData){
                const info = line.split(',');
                if(info.length > 1){
                    books.push(info[1]);
                }
            }
        }
        

        if (books.includes(ISBN)) {
            return res.send({ success: false, message: "ISBN already exists." });
        }
    

        const bookEntry = `${bookName},${ISBN},${author},${yearPublished}\n`;

        fs.appendFile("books.txt", bookEntry, (err) => {
            if (err) {
                return res.send({ success: false });
            }
            res.send({ success: true });
        });
    });
}
);




app.get('/', (req, res) => {
    res.send(`Web Server using Express JS - Book Management`);
});

// Start the server
app.listen(3000, () => {
    console.log(`Server started at port http://localhost:3000`);
});
