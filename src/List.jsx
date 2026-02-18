import {} from "react";

const item = [
  {
    task: "Выучить React",
    icon: "👽",
    isCompleted: false,
  },
  {
    task: "Закрепить JavaScript",
    icon: "👽",
    isCompleted: true,
  },
  {
    task: "Не забивать на английский",
    icon: "👽",
    isCompleted: false,
  },
];

export const List = () => {
  return (
    <div>
      {item.map((item, index) => {
        return (
          <section key={index} className={item.isCompleted ? "completed" : ""}>
            <span>{item.icon}</span>
            <h4>{item.task}</h4>
          </section>
        );
      })}
    </div>
  );
};
