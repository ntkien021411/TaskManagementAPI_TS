import  { Request, Response } from "express";
import Task from "../models/task.model";
import pagination from "../../../helpers/pagination";
import search from "../../../helpers/search";
//Filter/Sort/Pagination/Search
//[GET] /api/v1/tasks
//[GET] /api/v1/tasks?status=...&sortKey=title&sortValue=asc
//[GET] /api/v1/tasks?page=1&limit=3
//[GET] /api/v1/tasks?keyword=...
export const index = async (req:Request, res:Response) => {

  interface Find {
    deleted: boolean,
    status? :String,
    title? : RegExp,
  }

  const find : Find = {
    // $or : [
    //   {createdBy : req.user.id},
    //   {listUser : req.user.id}
    // ],
    deleted: false,
  };
  // Filter Status:Trạng thái
  if (req.query.status) {
    find.status = req.query.status.toString();
  }

  //Search Title
  let objectSearch = search(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }

  //Total Page
  let countTask = await Task.countDocuments(find);
  //PAGINATION
  let initPagination = {
    limitItem: 2,
    currentPage: 1,
  };
  let objectPagination = pagination(req.query, initPagination, countTask);

  //Sort
  const sort = { };
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey.toLocaleString()] = req.query.sortValue;
  }

  //Result
  const task = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.json(task);
};

//[GET] /api/v1/tasks/detail/:id
export const detail = async (req:Request, res:Response) => {
  const id = req.params.id;
  try {
    const task = await Task.find({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy!");
  }
};

//[PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req:Request, res:Response)  => {
  try {
    const id : string = req.params.id;
    const status : string = req.body.status;
    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!",
    });
  }
};

//[PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req:Request, res:Response)  => {
  try {
    const ids:String[] = req.body.ids;
    const  key:String = req.body.key;
    const value:String = req.body.value;
    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!",
        });
        break;
      case "delete":
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: true,
            deletedAt: new Date(),
          }
        );
        res.json({
          code: 200,
          message: "Xóa nhiều nhiệm vụ thành công!",
        });
        break;

      default:
        res.json({
          code: 400,
          message: "Không tồn tại!",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!",
    });
  }
};

//[POST] /api/v1/tasks/create
export const create = async (req:Request, res:Response)  => {
  try {
    // req.body.createdBy = req.user.id;
    const task = new Task(req.body);
    const data = await task.save();
    res.json({ 
      code: 200,
      message: "Tạo mới thành công!",
      data: data,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo mới thất bại!",
    });
  }
};

//[PATCH] /api/v1/tasks/edit/:id
export const edit = async (req:Request, res:Response)  => {
  try {
    const id:string = req.params.id;
    await Task.updateOne(
      {
        _id: id,
      },
      req.body
    );
    res.json({
      code: 200,
      message: "Cập nhật nhiệm vụ thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật thất bại!",
    });
  }
};

// //[DELETE] /api/v1/tasks/delete/:id
// module.exports.delete = async (req:Request, res:Response)  => {
//   try {
//     const id = req.params.id;
//     await Task.updateOne(
//       {
//         _id: id,
//       },
//       {
//         deleted: true,
//         deletedAt: new Date(),
//       }
//     );
//     res.json({
//       code: 200,
//       message: "Xóa thành công!",
//     });
//   } catch (error) {
//     res.json({
//       code: 400,
//       message: "Không tồn tại!",
//     });
//   }
// };
