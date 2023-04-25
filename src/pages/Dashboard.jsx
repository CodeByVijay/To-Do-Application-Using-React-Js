import { React, useState } from "react";
import ThemeColor from "../ThemeColor";

const Dashboard = () => {
  const todoDatas = localStorage.getItem("todos");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [todo, setTodo] = useState(JSON.parse(todoDatas));
  const [editId, setEditId] = useState("");

  const [parantTodoId, setParantTodoId] = useState("");
  const [subTodoOpen, setSubTodoOpen] = useState("");

  const handleTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const handleAddModalBtn = () => {
    setShowModal(true);
  };
  const handleAddToDo = () => {
    const addTodo = [
      ...todo,
      { id: Date.now(), value: todoText, completed: false, subToDos: [] },
    ];
    setTodo(addTodo);
    localStorage.setItem("todos", JSON.stringify(addTodo));
    setTodoText("");
    setShowModal(false);
  };

  const handleAddSubToDo = (e, todoId) => {
    const index = todo.findIndex((item) => item.id === todoId);
    const updatedTodo = [...todo];
    updatedTodo[index].subToDos = [
      ...updatedTodo[index].subToDos,
      { id: Date.now(), value: todoText, completed: false },
    ];
    setTodo(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    setParantTodoId("");
    setTodoText("");
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setParantTodoId("");
  };

  const handleDelete = (e, todoId) => {
    const removeEle = todo.filter((data) => data.id !== todoId);
    setTodo(removeEle);
    localStorage.setItem("todos", JSON.stringify(removeEle));
  };

  const handleEdit = (e, todoId) => {
    const index = todo.findIndex((item) => item.id === todoId);
    const getTodo = [...todo];
    setEditId(getTodo[index].id);
    setTodoText(getTodo[index].value);
    setShowEditModal(true);
  };

  const handleEditToDo = (todoId) => {
    const index = todo.findIndex((item) => item.id === todoId);
    const updatedTodo = [...todo];
    updatedTodo[index].value = todoText;
    setTodo(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    setEditId("");
    setTodoText("");
    setShowEditModal(false);
  };
  const handleComplete = (e, todoId) => {
    const index = todo.findIndex((item) => item.id === todoId);
    const updatedTodo = [...todo];
    updatedTodo[index].completed = !updatedTodo[index].completed;
    setTodo(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
  };
  const HandleSubTodoDivOpen = (e, index) => {
    setSubTodoOpen(index);
  };
  const HandleSubTodoDivClose = () => {
    setSubTodoOpen("");
  };
  const handleSubTodo = (e, todoId) => {
    setParantTodoId(todoId);
    setShowModal(true);
  };

  const handleSubTodoEdit = (e, parantid, childId) => {};
  const handleSubTodoDelete = (e, parantid, childId) => {
    const index = todo.findIndex((item) => item.id === parantid);
    const subTodos = [...todo];
    subTodos[index].subToDos = subTodos[index].subToDos.filter(
      (data) => data.id !== childId
    );
    setTodo(subTodos);
    localStorage.setItem("todos", JSON.stringify(subTodos));
  };
  return (
    <>
      <div className={`bg-[${ThemeColor["gray_100"]}] h-screen`}>
        <div
          className={`header mb-5 mx-auto py-3 bg-[${ThemeColor["sky_200"]}] text-center text-lg font-black text-[${ThemeColor["rose_500"]}] border-b-2 border-[${ThemeColor["sky_700"]}]`}
        >
          <span>To-Do App</span>
        </div>
        <div className="md:container md:mx-auto w-5/6 md:w-2/3 mx-auto sm:w-5/6 ">
          <div className="addButton ">
            <button
              type="button"
              className={`bg-[${ThemeColor["blue_500"]}] p-2 text-[${ThemeColor["white"]}] hover:bg-[${ThemeColor["blue_600"]}] rounded-md`}
              onClick={handleAddModalBtn}
            >
              <i className="fa fa-plus"></i> Add New
            </button>
          </div>

          <div
            className={`TodoList my-5 p-5 bg-[${ThemeColor["sky_100"]}] hover:bg-[${ThemeColor["sky_200"]}] border border-[${ThemeColor["sky_500"]}] p-3`}
          >
            {todo.length > 0 ? (
              todo.map((val, i) => {
                return (
                  <>
                    <div key={i} className="grid grid-cols-5 gap-4 mb-2">
                      <div className="px-2">
                        {subTodoOpen === i ? (
                          <span
                            className="px-5"
                            onClick={(e) => HandleSubTodoDivClose()}
                          >
                            <i class="fa fa-angle-up"></i>
                          </span>
                        ) : (
                          <span
                            className="px-5"
                            onClick={(e) => HandleSubTodoDivOpen(e, i)}
                          >
                            <i class="fa fa-angle-down"></i>
                          </span>
                        )}

                        <input
                          id={`check${i}`}
                          type="checkbox"
                          checked={(val.completed && val.completed) || false}
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => handleComplete(e, val.id)}
                        />
                      </div>
                      {val.completed ? (
                        <div className="todoTitle col-span-3">
                          <strike
                            className={`decoration-[${ThemeColor["black"]}] text-[${ThemeColor["rose_500"]}]`}
                          >
                            {val.value}
                          </strike>
                        </div>
                      ) : (
                        <div className="todoTitle col-span-3">{val.value}</div>
                      )}
                      <div className="todoAction">
                        <i
                          className={`fa fa-plus mx-2 text-[${ThemeColor["white"]}] cursor-pointer bg-[${ThemeColor["emerald_600"]}] p-2 rounded-md`}
                          onClick={(e) => handleSubTodo(e, val.id)}
                          title="Add Sub To-Do"
                        ></i>
                        <i
                          className={`fa fa-pencil-square mx-2 text-[${ThemeColor["white"]}] cursor-pointer bg-[${ThemeColor["emerald_600"]}] p-2 rounded-md`}
                          onClick={(e) => handleEdit(e, val.id)}
                          title="Edit To-Do"
                        ></i>
                        <i
                          className={`fa fa-trash mx-2 text-[${ThemeColor["white"]}] cursor-pointer bg-[${ThemeColor["rose_500"]}] p-2 rounded-md`}
                          onClick={(e) => handleDelete(e, val.id)}
                          title="Delete To-Do"
                        ></i>
                      </div>
                    </div>

                    {subTodoOpen === i &&
                      val.subToDos.length > 0 &&
                      val.subToDos.map((subVal, subIndex) => {
                        return (
                          <>
                            <div
                              key={subIndex + 2}
                              className={`grid grid-cols-5 gap-4 p-2 place-items-center bg-[${ThemeColor["white"]}]`}
                            >
                              <div className="px-2">
                                <input
                                  id={`check${i}`}
                                  type="checkbox"
                                  checked={
                                    (subVal.completed && subVal.completed) ||
                                    false
                                  }
                                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={(e) => handleComplete(e, subVal.id)}
                                />
                              </div>
                              {subVal.completed ? (
                                <div className="todoTitle col-span-4">
                                  <strike
                                    className={`decoration-[${ThemeColor["black"]}] text-[${ThemeColor["rose_500"]}]`}
                                  >
                                    {subVal.value}
                                  </strike>
                                </div>
                              ) : (
                                <div className="todoTitle col-span-3">
                                  {subVal.value}
                                </div>
                              )}
                              <div className="todoAction">
                                <i
                                  className={`fa fa-pencil-square mx-2 text-[${ThemeColor["white"]}] cursor-pointer bg-[${ThemeColor["emerald_600"]}] p-2 rounded-md`}
                                  onClick={(e) =>
                                    handleSubTodoEdit(e, val.id, subVal.id)
                                  }
                                  title="Edit To-Do"
                                ></i>
                                <i
                                  className={`fa fa-trash mx-2 text-[${ThemeColor["white"]}] cursor-pointer bg-[${ThemeColor["rose_500"]}] p-2 rounded-md`}
                                  onClick={(e) =>
                                    handleSubTodoDelete(e, val.id, subVal.id)
                                  }
                                  title="Delete To-Do"
                                ></i>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    <hr
                      className={`h-px my-4 bg-[${ThemeColor["sky_300"]}] w-full border-0 dark:bg-[${ThemeColor["sky_800"]}]`}
                    />
                  </>
                );
              })
            ) : (
              <h4 className="text-center">No Data Found.</h4>
            )}
          </div>
        </div>
      </div>

      {/* Add New Todo Modal */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                  {parantTodoId !== "" ? (
                    <h3 className="text-3xl font-semibold">Add Sub To-Do</h3>
                  ) : (
                    <h3 className="text-3xl font-semibold">Add New To-Do</h3>
                  )}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    id="website-admin"
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Todo...."
                    onChange={(e) => handleTodoText(e)}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs"
                    type="button"
                    onClick={() => handleCloseModal()}
                  >
                    Close
                  </button>
                  {parantTodoId !== "" ? (
                    <button
                      className={`bg-[${ThemeColor["blue_500"]}] text-white active:[${ThemeColor["blue_600"]}]  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs`}
                      type="button"
                      onClick={(e) => handleAddSubToDo(e, parantTodoId)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className={`bg-[${ThemeColor["blue_500"]}] text-white active:[${ThemeColor["blue_600"]}]  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs`}
                      type="button"
                      onClick={() => handleAddToDo()}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Add New Todo Modal End*/}

      {/* Edit Todo Modal */}
      {showEditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                  <h3 className="text-3xl font-semibold">Edit To-Do</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    type="text"
                    id="website-admin"
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Todo...."
                    value={todoText.length > 0 ? todoText : ""}
                    onChange={(e) => handleTodoText(e)}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className={`bg-[${ThemeColor["blue_500"]}] text-white active:[${ThemeColor["blue_600"]}]  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs`}
                    type="button"
                    onClick={() => handleEditToDo(editId)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Edit Todo Modal End*/}
    </>
  );
};

export default Dashboard;
