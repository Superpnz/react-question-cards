import { useState, useEffect, useMemo, useRef, type ChangeEvent, type MouseEvent } from "react";
import { API_URL } from "../../constants/global.constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import { toast } from "react-toastify";
import type { IQuestionCard, IQuestionCardData } from "../../types/global.types";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [searchParams, setSearchParams] = useState<string>(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`);
  const [questions, setQuestions] = useState<IQuestionCardData | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortSelectValue, setSortSelectValue] = useState<string>("");
  const [countSelectValue, setCountSelectValue] = useState<number>(DEFAULT_PER_PAGE);

  const controlsContainerRef = useRef<HTMLDivElement | null>(null);

  const getActivePageNumber = (questions: IQuestionCardData): number | null => {
    if (questions.next === null) return questions.last ?? null;
    return (questions.next ?? 1) - 1;
  };
  // questions.next === null ? questions.last : questions.next - 1;

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const result = await response.json();

    // нормализуем ответ: массив в объект с data
    if (Array.isArray(result)) {
      setQuestions({
        data: result,
        pages: 1,
        next: null,
        last: 1,
      });
    } else {
      setQuestions(result);
    }

    return result;
  });

  const cards = useMemo(() => questions?.data || [], [questions]);

  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;
    return Array(totalCardsCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    getQuestions(`react${searchParams}`);
  }, [searchParams]);

  const onSearchChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSortSelectValue(e.target.value);
    setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`);
  };

  const onCountSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCountSelectValue(+e.target.value);
    setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`);
  };

  const paginationHandler = (e: MouseEvent<HTMLDivElement>): void => {
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      setSearchParams(`?_page=${(e.target as HTMLElement).textContent}&_per_page=${countSelectValue}&${sortSelectValue}`);
      controlsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);

      if (!response.ok) {
        throw new Error(`Loading error: ${response.status} ${response.statusText}`);
      }

      const data: IQuestionCard[] = await response.json();

      if (!searchValue.trim()) {
        setQuestions({
          data,
          pages: Math.ceil(data.length / countSelectValue),
          next: 1,
          last: Math.ceil(data.length / countSelectValue),
        });
        setSearchParams(`?_page=1&_per_page=${countSelectValue}&${sortSelectValue}`);
        toast.success("Data loaded successfully!");
        setSearchValue("");
        return;
      }

      const query = searchValue.trim().toLowerCase();
      const filtered = data.filter((q) => q.question.toLowerCase().includes(query));

      setQuestions({
        data: filtered,
        pages: 1,
        next: null,
        last: 1,
      });

      if (filtered.length > 0) {
        toast.success(`${filtered.length} cards found!`);
      } else {
        toast.error("Nothing found 😕");
      }

      setSearchValue("");
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <SearchInput className={cls.searchInput} value={searchValue} onChange={onSearchChangeHandler} />
        <div className={cls.searchButton}>
          <Button
            onClick={(e) => {
              handleSearchClick();
              e.currentTarget.blur();
            }}
          >
            Search
          </Button>
        </div>

        <select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={`${cls.select} ${cls.sortSelect}`}>
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ASC</option>
          <option value="_sort=-completed">completed DESC</option>
        </select>

        <select value={countSelectValue} onChange={onCountSelectChangeHandler} className={`${cls.select} ${cls.countSelect}`}>
          <option disabled>count</option>
          <hr />
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      <QuestionCardList cards={cards} />

      {cards.length === 0 ? (
        <p className={cls.noCardsInfo}>No cards... 😕</p>
      ) : (
        !searchValue.trim() &&
        pagination.length > 1 && (
          <div className={cls.paginationContainer} onClick={paginationHandler}>
            {pagination.map((value) => (
              <Button key={value} isActive={value === getActivePageNumber(questions as IQuestionCardData)}>
                {value}
              </Button>
            ))}
          </div>
        )
      )}
    </>
  );
};
