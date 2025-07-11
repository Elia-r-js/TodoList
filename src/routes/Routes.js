import Inspiration from "../pages/insparation/inspiration";
import Todolist from "../pages/todolist/todolist";
import Mainpage from "../pages/mainpage/mainpage";

export const routes = {
  MainPage: {
    path: "/",
    Component: Mainpage,
  },
  TodoList: {
    path: "/TODOLIST",
    Component: Todolist,
  },
  inspiration: {
    path: "/inspairation",
    Component: Inspiration,
  },
};
