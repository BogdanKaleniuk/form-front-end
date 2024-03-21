import { useState } from "react";

import styles from "./Home.module.css";
import { SubmitHandler, useForm } from "react-hook-form";

const isSuccess = false;

interface iFormState {
  name: string;
  emael: string;
}

function Home() {
  const { register, handleSubmit, reset } = useForm<iFormState>();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<iFormState> = (data) => {
    setIsLoading(true);
    fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) return;
        setIsSuccess(true);
        reset();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Форма відправлена!</div>
        ) : (
          <>
            <h1>GTA 6 - Залиш заявку</h1>
            <input
              type="name"
              placeholder="Введіть Name:"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="Введіть Email:"
              {...register("email")}
            />
            <button disabled={isLoading}>
              {isLoading ? "Загрузка" : "Хочу GTA!"}{" "}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Home;
