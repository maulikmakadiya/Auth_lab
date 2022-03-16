
const upload = (file) =>{
    const path = __dirname+"../../images/" + file.name;
    file.mv(path, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = upload;