interface ObjectPagination {
  limitItem: number;
  currentPage: number;
  skip?: number;
  totalPage?: number;
}

const pagination = (query : Record<string,any>, objectPagination : ObjectPagination, countRecords : number) : ObjectPagination => {
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }
  if (query.limit) {
    objectPagination.limitItem = parseInt(query.limit);
  }
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItem;

  let totalPage = Math.ceil(countRecords / objectPagination.limitItem);
  objectPagination.totalPage = totalPage;
  return objectPagination;
};

export default pagination;
