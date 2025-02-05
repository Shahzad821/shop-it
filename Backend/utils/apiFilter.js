class APIFilter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // Corrected to $regex
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr };
    const fieldsToRemove = ["keyword", "page", "limit"]; // Removed 'page' and 'limit' as well, since they belong to pagination
    fieldsToRemove.forEach((field) => delete queryCopy[field]);

    let queryStr = JSON.stringify(queryCopy); // Fixed JSON.stringify
    // Replacing comparison operators to match MongoDB style
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`); // Fix applied to $gt, $gte, $lt, $lte

    this.query = this.query.find(JSON.parse(queryStr)); // Now parsing the modified query string
    return this;
  }

  pagination(resultsPerPage = 10) {
    // Default value for resultsPerPage
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);
    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}
export default APIFilter;
