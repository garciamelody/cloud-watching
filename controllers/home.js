module.exports = {
    getIndex: (req, res) => {
      res.render("index.ejs");
    },
    getSearch: (req, res) => {
      res.render("search.ejs" , {user: req.user});
    },
  };